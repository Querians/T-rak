'use client'
import Inputbutton from "./inputbtn"
import { CustomizeButton } from "./button";
import Link from "next/link";

export default function TierListForm() {
    return (
        <div className="flex gap-7">
            <form 
                action="/api/auth/signin"
                method='post'
                className='flex flex-col w-full gap-8'
            >
                <Inputbutton text='Tierlist Name' type='text' name='name'/>
                <Inputbutton text='Description' type='' name='description' isArea={1}/>
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