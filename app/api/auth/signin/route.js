import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data, error);

  if (error) {
    return NextResponse.json(
      {
        name: 'AuthApiError',
        message: error.message,
        status: 401,
      },
      { status: 401 }
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
