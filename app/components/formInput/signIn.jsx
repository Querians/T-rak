'use client'
import Inputbutton from "../inputComponent/inputbtn"
import { CustomizeButton } from "../inputComponent/button";
import Link from "next/link";
// import { Button } from "@nextui-org/react";

export default function SignInForm() {
    return (
        <div className="flex gap-7">
            <form 
                action="/api/auth/signin"
                method='post'
                className='flex flex-col w-full gap-8'
            >
                <Inputbutton text='Email' type='email' name='email'/>
                <Inputbutton text='Password' type='password' name='password'/>
                <div className="w-3/5 flex flex-col m-2 gap-2 items-center self-center">
                    <CustomizeButton text='Sign in' styles='btnpeach' btType="submit"/>
                    <p className="text-darkgrey">or</p>
                    <Link href={'/signup'} className="w-full">
                        <CustomizeButton text='Sign up' styles='btncherry'/>
                    </Link>
                </div>
            </form>
        </div>
    );
}