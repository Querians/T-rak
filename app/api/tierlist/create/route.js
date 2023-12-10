import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';
import hslToHex from '@/utils/hslToHex';

const tierlistInitial = [
  {
    color: 'red',
    hex: 'F8AFB1',
    label: 'All of my heart',
  },
  {
    color: 'orange',
    hex: 'FAD4BE',
    label: 'Part of my heart',
  },
  {
    color: 'yellow',
    hex: 'FAE6BE',
    label: 'In my heart',
  },
  {
    color: 'lightgreen',
    hex: 'F2FABE',
    label: 'Love that',
  },
  {
    color: 'green',
    hex: 'D8FABE',
    label: 'Ahh Ha',
  },
  {
    color: 'lightblue',
    hex: 'BEFAE4',
    label: 'Umm',
  },
  {
    color: 'blue',
    hex: 'BEECFA',
    label: "What that's",
  },
  {
    color: 'violet',
    hex: 'BED2FA',
    label: 'Nope',
  },
];

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
                label: tierlistInitial[index % tierlistInitial.length]['label'],
                color: tierlistInitial[index % tierlistInitial.length]['hex'],
                order: index,
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
    return NextResponse.redirect(
      requestUrl.origin + `/tierlist/edit/${dbResponse.tierlistId}`,
      {
        status: 301,
      }
    );
    // return NextResponse.json(dbResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
