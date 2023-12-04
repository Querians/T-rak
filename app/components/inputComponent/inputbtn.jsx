// 'use client'
// import {useState} from 'react'

export default function Inputbutton({
  text,
  type = 'text',
  name = '',
  read = 1,
  isArea = 0,
  headingColor = '',
  defaultValue = '',
  handleInputChange,
}) {
  // const [value, setValue] = useState("")

  // const handleInputChange = (e) => {
  //     const searchTerm = e.target.value;
  //     setValue(searchTerm)
  // }

  return (
    <div>
      <p
        className={`text-xl ${
          headingColor == 'white' ? 'text-white' : 'text-cherry'
        }`}
      >
        {text}
      </p>
      {isArea ? (
        <div className='w-full'>
          <textarea
            className='h-20 w-full resize-none items-center rounded-2xl border-1 border-white bg-lightpink px-3 py-1 text-darkgrey placeholder-peach shadow-lg'
            name='description'
            placeholder={text}
            // value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className='h-[36px] w-full rounded-2xl border-1 border-white bg-lightpink shadow-lg'>
          <input
            className='h-full w-full rounded-xl bg-transparent px-3 text-darkgrey placeholder:text-peach focus:ring-0'
            name={name}
            type={type}
            placeholder={text}
            defaultValue={defaultValue}
            // value={value}
            onChange={handleInputChange}
            readOnly={read ? 0 : 1}
          />
        </div>
      )}
    </div>
  );
}
