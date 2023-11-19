'use client'

const data = [
  {
      id: 1,
      name: 'Anime'
  },
  {
      id: 2,
      name: 'Food'
  },
  {
      id: 3,
      name: 'Routh'
  },
  {
      id: 4,
      name: 'Country'
  },
  {
      id: 5,
      name: 'Happy'
  },
  {
      id: 6,
      name: 'Time'
  },
  {
      id: 7,
      name: 'Yes'
  },
]


export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Combobox data={data}/>
    </main>
  );
}
