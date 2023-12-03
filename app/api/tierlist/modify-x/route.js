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
  const rowData = await request.json();
  // console.log(rowData);

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    const deleteElements = prisma.element.deleteMany({
      where: {
        elementId: {
          notIn: rowData
            .map((row) => row.elements.map((element) => element.id))
            .flat(),
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
              pictureUrl: element.picture,
              order: index,
              title: element.title,
              rowId: row.id,
            },
            update: {
              pictureUrl: element.picture || undefined,
              order: index || undefined,
              title: element.title || undefined,
              rowId: row.id || undefined,
            },
          });
        });
      })
      .flat();

    const deleteRows = prisma.row.deleteMany({
      where: {
        rowId: {
          notIn: rowData.map((row) => row.id),
        },
      },
    });

    const dbResponse = await prisma.$transaction(
      [deleteElements, ...upsertRows, ...upsertElements, deleteRows],
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
