'use client';
import Inputbutton from '../inputComponent/inputbtn';
import { CustomizeButton } from '../inputComponent/button';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axfetch from '@/utils/axfetch';
// import { Button } from "@nextui-org/react";

export default function SignInForm() {
  return (
    <div className='flex gap-7'>
      <form
        action='/api/auth/signin'
        method='post'
        className='flex w-full flex-col gap-8'
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          axfetch
            .post('/api/auth/signin', data)
            .then(() => {
              window.location.href = '/home';
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.message,
              });
            });
        }}
      >
        <Inputbutton text='Email' type='email' name='email' />
        <Inputbutton text='Password' type='password' name='password' />
        <div className='m-2 flex w-3/5 flex-col items-center gap-2 self-center'>
          <CustomizeButton text='Sign in' styles='btnpeach' btType='submit' />
          <p className='text-darkgrey'>or</p>
          <Link href={'/signup'} className='w-full'>
            <CustomizeButton text='Sign up' styles='btncherry' />
          </Link>
        </div>
      </form>
    </div>
  );
}
