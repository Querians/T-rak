import Image from "next/image";
import Link from "next/link";

export default function TierlistCard ({pic, tierlistName, category,link=''}){
    return(
        <>
            <Link href={link}>
                <div className="rounded-2xl bg-[#F1EEE7] w-80 h-[90px] shadow-lg flex flex gap-3 border-1 border-stone-200">
                <div className="rounded-l-2xl rounded-r-md w-[90px] h-full bg-lightpink shadow-lg flex items-center justify-center">
                    <Image
                        src={pic}
                        alt="picture"
                        width={70}
                        height={70}
                        className="rounded-lg"
                    />
                </div>
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-lg text-darkgrey">{tierlistName}</p>
                        <p className="text-md text-darkgrey">{category}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}