'use client'
import {useState} from 'react'

export default function Inputbutton({
  text,
  type = 'text',
  name = '',
  read = 1,
  isArea = 0,
  headingColor = '',
  defaultValue,
  value,
  handleInputChange
}) {
//   const [value, setValue] = useState("")

//   const handleInputChange = (e) => {
//       const inputTerm = e.target.value;
//       setValue(inputTerm)
//       console.log(value)
//   }

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
            className={`h-20 w-full resize-none items-center rounded-2xl border-1 border-white bg-lightpink px-3 py-1 ${(!read)?'text-peach':'text-darkgrey'} placeholder-peach shadow-lg`}
            name='description'
            placeholder={text}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            readOnly={read ? 0 : 1}
          />
        </div>
      ) : (
        <>
        { type == 'password' ? (
            <div className='h-[36px] w-full rounded-2xl border-1 border-white bg-lightpink shadow-lg mb-2'>
                <input
                    className='h-full w-full rounded-xl bg-transparent px-3 text-darkgrey placeholder:text-peach focus:ring-0'
                    name={name}
                    type={type}
                    placeholder={text}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={handleInputChange}
                    // minLength='6'
                    pattern=".{6,20}"
                    readOnly={read ? 0 : 1}
                    required
                    onInput={e => e.target.setCustomValidity('')}            
                />
                <p className='pt-1 text-center text-winered text-sm'>password must contain 6-20 characters</p>
            </div>
        ):(
            <div className='h-[36px] w-full rounded-2xl border-1 border-white bg-lightpink shadow-lg'>
                <input
                    className={`h-full w-full rounded-xl bg-transparent px-3 ${(!read)?'text-peach':'text-darkgrey'} placeholder:text-peach focus:ring-0`}
                    name={name}
                    type={type}
                    placeholder={text}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={handleInputChange}
                    readOnly={read ? 0 : 1}
                    required
                />
            </div>
        )}
        </>
      )}
      
    </div>
  );
}
