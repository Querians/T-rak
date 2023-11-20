import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  console.log(data, error);

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
}
