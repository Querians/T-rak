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
 *  picture[row][index]: File
 * } request
 * @returns {Promise<NextResponse>} JSON response
 */
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const tierlistData = await request.formData();
  const rowData = await JSON.parse(tierlistData.get('data'));
  console.log(rowData);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < rowData[i].elements.length; j++) {
        console.log('ij :', i, j);
        console.log(tierlistData.get(`picture[${i}][${j}]`));
        const file = tierlistData.get(`picture[${i}][${j}]`) || null;
        if (file !== null && file !== 'undefined' && file !== '') {
          console.log(`file : ${file}`);
          rowData[i].elements[j].picture = await uploadfile(file);
          rowData[i].elements[j].toShowSrc =
            await rowData[i].elements[j].picture.path;
        } else {
          rowData[i].elements[j].toShowSrc = null;
        }
      }
    }

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

    const upsertElements = rowData
      .map((row) => {
        return row.elements.map((element, index) => {
          return prisma.element.upsert({
            where: {
              elementId: element.id,
            },
            create: {
              pictureUrl: element.toShowSrc || '',
              order: index,
              title: element.title,
              row: {
                connect: {
                  rowId: row.id,
                },
              },
            },
            update: {
              pictureUrl: element.toShowSrc || undefined,
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

// get row in tierlist
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const rowId = requestUrl.searchParams.get('id');

  try {
    const queriedRow = await prisma.row.findUnique({
      where: {
        rowId: rowId,
      },
      include: {
        elements: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    const queriedHiddenRow = await prisma.row.findFirst({
      where: {
        tierlistId: queriedRow.tierlistId,
        order: -1,
      },
      include: {
        elements: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    console.log(queriedRow, queriedHiddenRow);
    return NextResponse.json([queriedRow, queriedHiddenRow]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

// delete row in tierlist
export async function DELETE(request) {
  const requestUrl = new URL(request.url);
  const rowId = requestUrl.searchParams.get('id');

  try {
    const deletedRow = await prisma.row.delete({
      where: {
        rowId: rowId,
      },
    });

    console.log(deletedRow);
    return NextResponse.json(deletedRow);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
