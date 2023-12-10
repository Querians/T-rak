import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';

// update tierlist info
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  const category = formData.get('categoryName')
    ? await prisma.category
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
          console.log('res', res);
          if (res === null) {
            return {
              categoryId: randomUUID({ disableEntropyCache: true }),
            };
          }
          return res;
        })
    : {};

  console.log('category', category);

  try {
    const fileResponse = formData.get('coverPhoto')
      ? await uploadfile(formData.get('coverPhoto'))
      : { path: undefined };

    const dbResponse = await prisma.tierlist.update({
      where: {
        tierlistId: formData.get('tierlistId'),
        userId: data.user.id,
      },
      data: {
        name: formData.get('name') || undefined,
        description: formData.get('description') || undefined,
        coverPhotoUrl: fileResponse.path || undefined,
        category: formData.get('categoryName')
          ? {
              connectOrCreate: {
                create: {
                  categoryName: formData.get('categoryName'),
                  categoryId: undefined,
                },
                where: {
                  categoryId: category.categoryId,
                },
              },
            }
          : undefined,
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
