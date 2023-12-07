'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function DropButton({ onClick, open }) {
  return (
    <div
      onClick={onClick}
      className='relative flex h-[1.625rem] w-10 cursor-pointer justify-center rounded-[0.625rem] border-1 border-[#ECB7BD] bg-cherry shadow-md'
    >
      <Image
        src='/toggle.svg'
        alt='Toggle'
        width={17.38}
        height={8.69}
        priority
        className={`${open == 0 ? '' : 'rotate-180'}`}
      />
    </div>
  );
}

export default function Combobox({
  data,
  text,
  defaultValue,
  handleCombobox,
  name,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [filteredCategory, setFilteredCategory] = useState(data);

  const handleOnClick = () => {
    setTimeout(function () {
      setIsOpen(!isOpen);
    }, 50);
  };

  const getValue = (category) => {
    setValue(category);

    const filteredItems = data.filter((dataCategory) =>
      dataCategory.name.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredCategory(filteredItems);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);
    if (handleCombobox) {
      handleCombobox(e);
    }

    const filteredItems = data.filter((dataCategory) =>
      dataCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategory(filteredItems);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
      setIsOpen(false);
    }
  };
  useEffect(() => {
    setFilteredCategory(data);
    setValue(defaultValue);
  }, [data, defaultValue]);

  return (
    <div className='flex h-[70px] w-full flex-col'>
      <p className='text-xl text-cherry'>{text}</p>
      <div className='relative flex h-9 items-center gap-2 rounded-2xl border-1 border-white bg-lightpink px-2 shadow-lg'>
        <input
          className='w-full rounded-xl bg-transparent pl-2 text-darkgrey placeholder:text-peach focus:ring-0 focus:ring-offset-0'
          type='text'
          placeholder={text}
          name={name}
          value={value}
          onFocus={() => {
            if (isOpen == false) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 150);
          }}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          required
        />
        <DropButton onClick={handleOnClick} open={isOpen} />
        <div className='absolute -bottom-[7.5rem] right-0 h-28 justify-start'>
          {isOpen && (
            <div className='max-h-28 w-60 overflow-auto rounded-xl border-1 border-white bg-cream px-[11px] py-1 shadow-lg'>
              {!filteredCategory?.length ? (
                <p className='text-darkgrey'>Not found</p>
              ) : (
                <div className='divide-y-1 divide-darkgrey'>
                  {filteredCategory?.map((choice, index) => (
                    <p
                      tabIndex='0'
                      key={index}
                      className='cursor-pointer text-darkgrey'
                      onClick={() => {
                        getValue(choice.name);
                        handleOnClick();
                      }}
                    >
                      {choice.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
