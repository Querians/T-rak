import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';

// update row in tierlist
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const rowData = await request.json();
  // console.log(rowData);

  console.log(
    rowData[0].elements.map((element, index) => {
      return {
        elementId: element.id,
        pictureUrl: element.toShowSrc,
        picture: element.picture,
        title: element.title,
        order: index,
      };
    })
  );

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    await Promise.all(
      rowData[0].elements.map(async (element) => {
        if (
          element.picture !== null &&
          element.picture !== undefined &&
          element.picture !== ''
        ) {
          element.picture = await uploadfile(element.picture);
          element.toShowSrc = element.picture.path;
        }
      })
    );

    const updateRow = prisma.row.update({
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
          notIn: rowData[0].elements.map((element) => element.id),
        },
      },
    });

    const upsertElements = rowData[0].elements.map((element, index) => {
      return prisma.element.upsert({
        where: {
          elementId: element.id,
        },
        create: {
          pictureUrl: element.toShowSrc,
          order: index,
          title: element.title,
          rowId: rowData[0].id,
        },
        update: {
          pictureUrl: element.toShowSrc || undefined,
          order: index || undefined,
          title: element.title || undefined,
        },
      });
    });

    const dbResponse = await prisma.$transaction([
      updateRow,
      deleteElements,
      ...upsertElements,
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
