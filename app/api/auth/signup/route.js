import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';

// signup user
/**
 *
 * @param {Request} request
 *  name: string;
 *  picture: File;
 *  email: string;
 *  password: string;
 * @returns
 *  redirect to home
 */
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (!email || !password) {
    return NextResponse.json(
      {
        name: 'AuthApiError',
        message: 'Email and password are required',
        status: 422,
      },
      { status: 422 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      {
        name: 'AuthApiError',
        message: 'Password should be at least 6 characters',
        status: 422,
      },
      { status: 422 }
    );
  }

  if (!formData.get('name')) {
    return NextResponse.json(
      {
        name: 'AuthApiError',
        message: 'Name is required',
        status: 422,
      },
      { status: 422 }
    );
  }

  if (!formData.get('picture')) {
    return NextResponse.json(
      {
        name: 'AuthApiError',
        message: 'Picture is required',
        status: 422,
      },
      { status: 422 }
    );
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    console.log(data, error);
    if (error) {
      if (error.message == 'User already registered') {
        return NextResponse.json(
          {
            name: 'AuthApiError',
            message: 'User already registered',
            status: 409,
          },
          { status: 409 }
        );
      } else {
        return NextResponse.json(error, { status: error.status });
      }
    }

    console.log(formData.get('picture'));
    const fileResponse = await uploadfile(formData.get('picture'));

    const dbResponse = await prisma.user.create({
      data: {
        email: data.user.email,
        name: formData.get('name'),
        image: fileResponse.path,
        userId: data.user.id,
      },
    });

    console.log(dbResponse);
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
