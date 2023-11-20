import Image from "next/image";
import Link from "next/link";

export default function MenuIcon ({type, logo, status, link='/'}) {
    const bgColors = ['bg-cherry','bg-cream']
    // const iconColors = ['#f6d8df','lightpink','bg-cherry']
    return(
        <div>
            <Link href={link}>
                <button className={`w-[50px] h-[50px] rounded-xl ${bgColors[status]} cursor-pointer flex justify-center items-center shadow-md`}>
                    <Image
                        src={logo}
                        alt={type}
                        width={35}
                        height={35}
                        // fill={iconColors[status]}
                    />
                    <p></p>
                </button>
            </Link>
        </div>
    );
}