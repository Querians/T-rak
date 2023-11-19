'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SigninForm() {
  // const router = useRouter();
  // const supabase = createClientComponentClient();

  return (
    <div>
      <form
        action='/api/auth/signin'
        method='post'
        className='flex flex-col items-center justify-center gap-8'
      >
        <label htmlFor='email'>email</label>
        <input name='email' />
        <label htmlFor='password'>password</label>
        <input type='password' name='password' />
        <button>Sign In</button>
        <button formAction='/api/auth/signup'>Sign Up</button>
        <button formAction='/api/auth/signout'>Sign Out</button>
      </form>
    </div>
  );
}
