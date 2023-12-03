'use client'
import Inputbutton from "../inputbtn"
import { CustomizeButton } from "../button";

export default function ProfileSetting({editState, handleOnClick}) {
    return (
        <div className="flex gap-7 px-2">
            <form 
                action="/api/auth/createTierlist"
                method='post'
                className='flex flex-col w-full gap-5'
            >
                <div className="self-center bg-red-400 rounded-full w-[90px] h-[90px]">
                    {/* add profile photo */}
                </div> 
                <Inputbutton text='Email' type='email' name='email' read={editState}/>
                <Inputbutton text='Username' type='text' name='name' read={editState}/>
                <Inputbutton text='About Me' name='aboutMe' isArea={1} read={editState}/>
                {(editState) ? 
                    <div className="flex gap-[18px] pt-4 justify-between ">
                        <div className="basis-1/3">
                            <CustomizeButton text='Cancel' styles='btncherry' onClick={handleOnClick}/>
                        </div>
                        <div className="basis-2/3">
                            <CustomizeButton text='Save' styles='btnpeach' btType="submit" onClick={handleOnClick}/>
                        </div>                 
                    </div>
                :
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-[40%]">
                            <CustomizeButton text='Edit' styles='btnpeach' btType="submit" onClick={handleOnClick}/>
                        </div>          
                    </div>
                }                 
            </form>
        </div>
    );
}