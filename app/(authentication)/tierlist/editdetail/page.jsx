import Image from "next/image";
import TierListDetailEdit from "@/app/components/formInput/edittierlist";

export default function EditTierlistDetail({profile="/profilelight.svg"}) {
  return (
    <main className='flex flex-col h-screen w-full'>
      <div className='h-[18%] w-full pt-10 px-8 flex gap-[15px] justify-left items-center'>
        <div className="w-[70px] h-[70px] rounded-full relative">
          <Image
            src={profile}
            alt='Profile Picture'
            className='rounded-full object-cover cursor-pointer shadow-lg'
            fill={true}
            quality={100}
            sizes="(max-width: 70px) 100vw, 33vw"
            priority
          />
        </div> 
        <p className='text-2xl text-white '>Edit Tier-list Detail</p>
      </div>
      <div className='h-5/6 p-8 bg-cream rounded-t-2xl'>
        <TierListDetailEdit />
      </div>
    </main>
  );
}