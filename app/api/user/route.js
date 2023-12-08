import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';

// update user
/**
 *
 * @param {Request} request
 *  name: string;
 *  picture: File;
 *  description: string;
 * @returns
 */
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  try {
    const fileResponse = formData.get('picture')
      ? await uploadfile(formData.get('picture'))
      : { path: undefined };
    const dbResponse = await prisma.user.update({
      where: {
        userId: data.user.id,
      },
      data: {
        name: formData.get('name') || undefined,
        aboutMe: formData.get('aboutMe') || undefined,
        image: fileResponse.path || undefined,
      },
    });
    console.log(dbResponse);
    return NextResponse.json(dbResponse);
  } catch (error) {
    return NextResponse.error(error);
  }
}

// get user
export async function GET(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.getUser();
  console.log(data, error);

  const dbResponse = await prisma.user.findUnique({
    where: {
      userId: data.user.id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      aboutMe: true,
    },
  });

  return NextResponse.json(dbResponse);
}
