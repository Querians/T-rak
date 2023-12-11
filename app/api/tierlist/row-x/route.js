import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';

// update row in tierlist
/**
 * @param {
 * url: string
 * formData: FormData
 *  data: string
 * } request
 * @returns {Promise<NextResponse>} JSON response
 */
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const rowData = await request.json();
  console.log(rowData);

  console.log(
    rowData[0].elements.map((element, index) => {
      return {
        elementId: element.id,
        pictureUrl: element.picture,
        title: element.title,
        order: index,
      };
    })
  );

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    const updateRowInfo = prisma.row.update({
      where: {
        rowId: rowData[0].id,
      },
      data: {
        label: rowData[0].label || undefined,
        color: rowData[0].color || undefined,
      },
    });

    const deleteElements = prisma.element.deleteMany({
      where: {
        elementId: {
          notIn: rowData
            .map((row) => row.elements.map((element) => element.id))
            .flat(),
        },
        rowId: {
          in: rowData.map((row) => row.id),
        },
      },
    });

    // console.log(rowData.map((row) => row.elements.map((element) => element.id)).flat())

    const upsertElements = rowData
      .map((row) => {
        return row.elements.map((element, index) => {
          return prisma.element.upsert({
            where: {
              elementId: element.id,
            },
            create: {
              pictureUrl: element.picture || '',
              order: index,
              title: element.title,
              row: {
                connect: {
                  rowId: row.id,
                },
              },
            },
            update: {
              pictureUrl: element.picture || undefined,
              order: index,
              title: element.title || undefined,
              rowId: row.id || undefined,
            },
          });
        });
      })
      .flat();

    const dbResponse = await prisma.$transaction([
      updateRowInfo,
      deleteElements,
      ...upsertElements,
      ...upsertHiddenRowElements,
    ]);

    console.log(dbResponse);
    return NextResponse.json(dbResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
