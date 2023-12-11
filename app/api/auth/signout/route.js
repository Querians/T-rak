import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// signout user
/**
 *
 * @param {
 * url: string
 * } request
 * @returns {Promise<NextResponse>} Redirects to the origin of the request URL
 */
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signOut();

  console.log(data, error);

  return NextResponse.redirect(`${requestUrl.origin}/signin`, {
    status: 301,
  });
}
