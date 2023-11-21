import MenuIcon from './menuIcon';

export default function MenuBar({ type }) {
  return (
    <>
      <div className='flex h-[70px] w-[280px] gap-[30px] rounded-xl border-1 border-[#F8EBEF] bg-lightpink px-[35px] py-[10px] shadow-lg'>
        <MenuIcon
          logo={type == 'home' ? '/home.svg' : '/homelight.svg'}
          type='home'
          status={type == 'home' ? 1 : 0}
        />
        <MenuIcon
          logo={type == 'add' ? '/plus.svg' : '/pluslight.svg'}
          type='add'
          status={type == 'add' ? 1 : 0}
          link='/createTierList'
        />
        <MenuIcon
          logo={type == 'profile' ? '/profile.svg' : '/profilelight.svg'}
          type='profile'
          status={type == 'profile' ? 1 : 0}
          link='/profile'
        />
      </div>
    </>
  );
}
