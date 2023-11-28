import MenuIcon from "./menuIcon";

export default function MenuBar ({type}) {
    return(
        <>
            <div className="bg-lightpink w-[280px] h-[70px] rounded-xl py-[10px] px-[35px] flex gap-[30px] shadow-lg border-1 border-[#F8EBEF]">
                <MenuIcon 
                    logo ={type=='home'?'/home.svg':'/homelight.svg'} 
                    type='home' status={type=='home'?1:0} 
                    link='/home'/>
                <MenuIcon 
                    logo ={type=='add'?'/plus.svg':'/pluslight.svg'} 
                    type='add' 
                    status={type=='add'?1:0} link='/createTierList'/>
                <MenuIcon 
                    logo ={type=='profile'?'/profile.svg':'/profilelight.svg'} 
                    type='profile' status={type=='profile'?1:0} 
                    link='/profile/setting'/>
            </div>
        </>
    );
}