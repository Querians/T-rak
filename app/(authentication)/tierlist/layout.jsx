export default function TierlistLayout({ children }) {
  return (
    <main className='flex min-h-screen'>
      <div className='h-[20vh]'></div>
      {children}
    </main>
  );
}
