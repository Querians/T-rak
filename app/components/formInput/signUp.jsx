'use client'
import Inputbutton from "../inputComponent/inputbtn"
import { CustomizeButton } from "../inputComponent/button";
import Inputtypefile from "../inputTypeFile";
import {useState} from 'react';

export default function SignUpForm( ) {
    const [signupDetails, setSignupDetails] = useState()
    return (
        <div className="flex gap-7 px-2">
            <form 
                action="/api/auth/signup"
                method='post'
                className='flex flex-col w-full gap-5'
                encType='multipart/form-data'
            >
                <Inputbutton text='Email' type='email' name='email'/>
                <Inputbutton text='Username' type='text' name='name'/>
                <Inputbutton text='Password' type='password' name='password'/>
                <Inputtypefile read={1} className=" w-[90px] h-[90px]" text ="Upload Profile Photo" name = 'picture' param = {signupDetails}
                 handleChange={(e)=> {setSignupDetails(
                    URL.createObjectURL(e.target.files[0])
                )}}
                />
                <div className="flex flex-col items-center pt-4">
                    <div className="w-[70%]">
                        <CustomizeButton text='Confirm' styles='btnpeach' btType="submit"/>
                    </div>
                </div>
            </form>
        </div>
    );
}