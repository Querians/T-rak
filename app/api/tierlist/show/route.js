import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadfile } from '@/utils/uploadfile';
import { randomUUID } from 'crypto';

// get all row in tierlist
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const tierlistId = requestUrl.searchParams.get('id');

  try {
    const queriedTierlist = await prisma.tierlist.findUnique({
      where: {
        tierlistId: tierlistId,
      },
      include: {
        rows: {
          orderBy: {
            order: 'asc',
          },
          include: {
            elements: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    console.log(queriedTierlist);
    return NextResponse.json(queriedTierlist);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
