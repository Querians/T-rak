'use client'
import Inputbutton from "../inputComponent/inputbtn"
import { CustomizeButton } from "../inputComponent/button";
import Link from "next/link";
import Combobox from "../inputComponent/combobox";
import NumberInput from "../inputComponent/numberInput";
import Inputtypefile from "../inputTypeFile";
import {useState} from 'react';

// const categoryData = [
//     {
//         id: '1',
//         name: 'Anime',
//     },
//     {
//         id: '2',
//         name: 'Animehell',
//     },
// ]

export default function TierListForm({}) {
    const [tierlistFormDetails, settierlistFormDetails] = useState()
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
                <Inputbutton text='Tier-list Name' type='text' name='name' />
                <Inputtypefile read={1} className=" w-[90px] h-[90px]" text ="Add Cover Photo" name = 'picture' isRequired={true} param={tierlistFormDetails}
                handleChange={(e)=> {settierlistFormDetails(
                    URL.createObjectURL(e.target.files[0])
                )}}/>
                <Combobox text='Category' data={categoryData}/>
                <Inputbutton text='Description' name='description' isArea={1}/>
                <NumberInput text='Number of row'/>
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