'use client'
import Inputbutton from "../inputComponent/inputbtn"
import { CustomizeButton } from "../inputComponent/button";
import Inputtypefile from "../inputTypeFile";


export default function ProfileSetting({editState, handleOnClick, profileData, handleCancel, setProfile}) {

    return (
        <div className="flex gap-7 px-2">
            <form 
                action="/api/auth/profile" //editlinkhere
                method='post'
                onSubmit={(e) => {
                    if(profileData.name.length <= 0){
                        return false
                    }
                    // console.log('fil in first')
                    handleOnClick()
                }}
                className='flex flex-col w-full gap-5'
            >
                <div className="self-center bg-red-400 rounded-full w-[90px] h-[90px]">
                    <Inputtypefile className="rounded-full w-[90px] h-[90px] shrink-0" read={editState} param ={profileData.image}/>
                </div> 
                <Inputbutton text='Email' type='email' name='email' read={0} value={profileData.email} />
                <Inputbutton text='Username' type='text' name='name' read={editState} value={profileData.name}
                    handleInputChange={(e) => {setProfile({
                        ...profileData,
                        ['name']: e.target.value
                    })}} 
                />
                {/* {(editState) ?
                    <Inputbutton text='Password' type='password' name='password' value={profileData.password}
                        handleInputChange={(e) => {setProfile({
                            ...profileData,
                            ['password']: e.target.value
                        })}} 
                    />
                 :
                    <></>   
                } */}
                <Inputbutton text='About Me' name='aboutMe' isArea={1} read={editState} value={profileData.aboutMe}
                    handleInputChange={(e) => {setProfile({
                        ...profileData,
                        ['aboutMe']: e.target.value
                    })}}
                />
                {(editState) ? 
                    <div className="flex gap-[18px] pt-4 justify-between ">
                        <div className="basis-1/3">
                            <CustomizeButton text='Cancel' styles='btncherry' onClick={handleCancel} />
                        </div>
                        <div className="basis-2/3">
                            <CustomizeButton text='Save' styles='btnpeach' btType="submit" />
                        </div>                 
                    </div>
                :
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-[40%]">
                            <CustomizeButton text='Edit' styles='btnpeach' btType="submit" onClick={handleOnClick} />
                        </div>          
                    </div>
                }                 
            </form>
        </div>
    );
}