'use client';
import { Input, Button } from '@nextui-org/react';

export default function SignUpForm() {
  return (
    <div>
      <form
        action='/api/auth/signup'
        method='post'
        className='flex flex-col justify-center gap-2'
        encType='multipart/form-data'
      >
        {/* email */}
        <label htmlFor='email'>email</label>
        <Input type='email' label='email' name='email' />

        {/* password */}
        <label htmlFor='password'>password</label>
        <Input type='password' label='password' name='password' />

        {/* name */}
        <label htmlFor='name'>name</label>
        <Input type='text' label='name' name='name' />

        {/* image */}
        <label htmlFor='picture'>image</label>
        <Input type='file' name='picture' />

        <Button className='bg-green-100' type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  );
}
