import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

// modify tierlist
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const tierlistData = await request.formData();
  const rowData = await JSON.parse(tierlistData.get('data'));
  console.log(rowData);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    for (let i = 0; i < rowData.length; i++) {
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

    const upsertRows = rowData.map((row, index) => {
      return prisma.row.upsert({
        where: {
          rowId: row.id,
        },
        create: {
          rowId: row.id,
          label: row.label,
          order: rowData.length - 1 === index ? -1 : index,
          color: row.color,
          tierlistId: requestUrl.searchParams.get('id'),
        },
        update: {
          label: row.label || undefined,
          order: rowData.length - 1 === index ? -1 : index,
          color: row.color || undefined,
          tierlistId: requestUrl.searchParams.get('id'),
        },
      });
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

    const dbResponse = await prisma.$transaction(
      // [deleteElements, ...upsertRows, ...upsertElements, deleteRows],
      [deleteElements, ...upsertRows, ...upsertElements],
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    console.log(dbResponse);
    return NextResponse.json(dbResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
