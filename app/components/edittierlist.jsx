'use client'
import Inputbutton from "./inputbtn"
import { CustomizeButton } from "./button";
import Link from "next/link";
import Combobox from "./combobox";
import NumberInput from "./numberInput";

export default function TierListDetailEdit({}) {
    const categoryData = [
        {
            id: '1',
            name: 'Anime',
        },
        {
            id: '2',
            name: 'Animehell',
        },
    ]
    return (
        <div className="flex gap-7 px-2">
            <form 
                action="/api/auth/createTierlist"
                method='post'
                className='flex flex-col w-full gap-5'
            >
                <Inputbutton text='Tierlist Name' type='text' name='name'/>
                {/* add cover photo */}
                <Combobox text='Category' data={categoryData}/>
                <Inputbutton text='Description' name='description' isArea={1}/>
                <div className="flex gap-[18px] pt-4 justify-between ">
                    <div className="basis-1/3">
                        <Link href={'/home'} className="w-full">
                            <CustomizeButton text='Cancel' styles='btncherry'/>
                        </Link>
                    </div>
                    <div className="basis-2/3">
                        <CustomizeButton text='Save' styles='btnpeach' btType="submit"/>
                    </div>                 
                </div>
            </form>
        </div>
    );
}