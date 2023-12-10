import Image from 'next/image';
import Link from 'next/link';

export default function MenuIcon({ type, logo, status, link = '/' }) {
  const bgColors = ['bg-cherry', 'bg-cream'];
  // const iconColors = ['#f6d8df','lightpink','bg-cherry']
  return (
    <div>
      <Link href={link}>
        <button
          className={`h-[50px] w-[50px] rounded-xl ${bgColors[status]} flex cursor-pointer items-center justify-center shadow-md`}
        >
          <Image
            src={logo}
            alt={type}
            width={0}
            height={0}
            className='h-[35px] w-[35px]'
            // fill={iconColors[status]}
          />
          <p></p>
        </button>
      </Link>
    </div>
  );
}
