import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// create category
export async function POST(request) {
  const formData = await request.formData();

  try {
    const isExist = await prisma.category.findFirst({
      where: {
        categoryName: formData.get('categoryName') || undefined,
      },
    });

    if (isExist !== null) {
      return NextResponse.json(
        {
          message: 'Category already exist',
        },
        {
          status: 400,
        }
      );
    }

    const dbResponse = await prisma.category.create({
      data: {
        categoryName: formData.get('categoryName') || undefined,
      },
    });

    console.log(dbResponse);
    return NextResponse.json(
      {
        message: 'Category created successfully',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.error(error);
  }
}
