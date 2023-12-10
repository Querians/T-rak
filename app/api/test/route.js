import { NextResponse } from 'next/server';

// test
/**
 * @param {Request} request
 * @returns {Response} response
 * json
 *   message: string
 */
export function GET(request) {
  return NextResponse.json({ message: 'Hello from the API of T-rak!' });
}
