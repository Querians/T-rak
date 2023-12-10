import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

import crypto from 'crypto';

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const bucket = 'images';
  let response;

  await request.formData().then(async (data) => {
    const filename = `${crypto.randomUUID({ disableEntropyCache: true })}-${
      data.get('picture').name
    }`;
    const { data: fileData, error: fileError } = await supabase.storage
      .from(bucket)
      .upload(filename, data.get('picture'));

    response = NextResponse.json({
      message: 'Successfully uploaded to Supabase',
      path: fileData.path,
    });

    if (fileError) {
      response = NextResponse.json({
        message: 'Failed to upload on Supabase',
        error: fileError,
      });
    }
    console.log(response);
  });

  return response;
}
