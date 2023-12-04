import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.redirect('/login');
  }

  try {
    const tierlist = await prisma.tierlist.findMany({
      where: {
        userId: data.user.id,
      },
      select: {
        tierlistId: true,
        name: true,
        description: true,
        coverPhotoUrl: true,
        category: {
          select: {
            categoryName: true,
          },
        },
      },
    });

    return NextResponse.json(tierlist);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function DELETE(request) {
  const requestUrl = new URL(request.url);
  const tierlistId = requestUrl.searchParams.get('id');
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.redirect('/login');
  }

  try {
    await prisma.tierlist.delete({
      where: {
        tierlistId: tierlistId,
      },
    });

    return NextResponse.json({
      message: `Tierlist ID ${tierlistId} has already deleted`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
