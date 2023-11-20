'use client';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';

export default function SigninForm() {
  return (
    <div>
      <form
        action='/api/auth/signin'
        method='post'
        className='flex flex-col items-center justify-center gap-8'
      >
        {/* email */}
        <label htmlFor='email'>email</label>
        <Input type='email' label='email' name='email' />

        {/* password */}
        <label htmlFor='password'>password</label>
        <Input type='password' label='password' name='password' />

        <Button className='bg-green-100' type='submit'>
          Sign In
        </Button>
        <Link href={'/signup'}>Sign Up</Link>
      </form>
    </div>
  );
}
