import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';
import hslToHex from '@/utils/hslToHex';

// create tierlist
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (formData.get('categoryName') === null) {
    return NextResponse.json(
      {
        message: 'Category name is required',
      },
      {
        status: 400,
      }
    );
  }

  if (formData.get('rowCount') === null || formData.get('rowCount') < 1) {
    return NextResponse.json(
      {
        message: 'Amount row is required',
      },
      {
        status: 400,
      }
    );
  }

  if (formData.get('name') === null) {
    return NextResponse.json(
      {
        message: 'Tierlist name is required',
      },
      {
        status: 400,
      }
    );
  }

  if (formData.get('description') === null) {
    return NextResponse.json(
      {
        message: 'Tierlist description is required',
      },
      {
        status: 400,
      }
    );
  }

  if (formData.get('coverPhoto') === null) {
    return NextResponse.json(
      {
        message: 'Tierlist cover photo is required',
      },
      {
        status: 400,
      }
    );
  }

  const category = await prisma.category
    .findFirst({
      where: {
        categoryName: formData.get('categoryName'),
      },
      select: {
        categoryId: true,
        categoryName: false,
      },
    })
    .then((res) => {
      if (res === null) {
        return {
          categoryId: randomUUID({ disableEntropyCache: true }),
        };
      }
      return res;
    });

  try {
    const fileResponse = formData.get('coverPhoto')
      ? await uploadfile(formData.get('coverPhoto'))
      : { path: undefined };

    const dbResponse = await prisma.tierlist.create({
      data: {
        name: formData.get('name') || undefined,
        description: formData.get('description') || undefined,
        coverPhotoUrl: fileResponse.path || undefined,
        user: {
          connect: {
            userId: data.user.id,
          },
        },
        category: {
          connectOrCreate: {
            create: {
              categoryName: formData.get('categoryName'),
              categoryId: undefined,
            },
            where: {
              categoryId: category.categoryId,
            },
          },
        },
        rows: {
          createMany: {
            data: [
              ...Array.from(
                { length: formData.get('rowCount') },
                (v, k) => k
              ).map((_, index) => ({
                label: `Row ${index + 1}`,
                color: hslToHex(Math.floor(Math.random() * 360), 100, 80),
                order: index + 1,
              })),
              {
                label: `hidden row`,
                color: hslToHex(Math.floor(Math.random() * 360), 100, 80),
                order: -1,
              },
            ],
          },
        },
      },
    });

    console.log(dbResponse);
    return NextResponse.json(dbResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
