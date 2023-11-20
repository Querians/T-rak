'use client';
import { useState } from 'react';

export default function UploadPicture() {
  const [picture, setPicture] = useState(null);

  console.log(picture);

  return (
    <div className='flex'>
      <h>Upload Picture</h>
      <input
        type='file'
        onChange={(e) => {
          setPicture(e.target.files[0]);
        }}
      />

      <button
        onClick={async () => {
          const formData = new FormData();
          formData.append('picture', picture);
          const res = await fetch('/api/image/upload', {
            method: 'POST',
            body: formData,
          });
        }}
      >
        Upload
      </button>
    </div>
  );
}
