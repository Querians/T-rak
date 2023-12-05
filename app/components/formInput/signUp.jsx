'use client'
import Inputbutton from "../inputComponent/inputbtn"
import { CustomizeButton } from "../inputComponent/button";
import Inputtypefile from "../inputTypeFile";

export default function SignUpForm() {
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
                <Inputtypefile read={1} className=" w-[90px] h-[90px]" text ="Upload Profile Photo" name = 'picture' />
                // <Inputbutton text='About Me' name='aboutMe' isArea={1}/>
                <div className="flex flex-col items-center pt-4">
                    <div className="w-[70%]">
                        <CustomizeButton text='Confirm' styles='btnpeach' btType="submit"/>
                    </div>
                </div>
            </form>
        </div>
    );
}