import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function uploadfile(file) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const bucket = 'images';
  let response;

  const filename = `${crypto.randomUUID({ disableEntropyCache: true })}-${
    file.name
  }`;
  const { data: fileData, error: fileError } = await supabase.storage
    .from(bucket)
    .upload(filename, file);

  response = {
    message: 'Successfully uploaded to Supabase',
    path: fileData.path,
  };

  if (fileError) {
    response = { message: 'Failed to upload on Supabase', error: fileError };
  }
  console.log(response);

  return response;
}
