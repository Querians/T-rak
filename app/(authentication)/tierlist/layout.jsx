export default function TierlistLayout({ children }) {
  return (
    <main className='flex min-h-screen p-8'>
      <div className='h-[20vh]'></div>
      {children}
    </main>
  );
}
