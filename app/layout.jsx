import './globals.css';
import Providers from './providers.jsx';
import localFont from 'next/font/local';

const subjectRounded = localFont({
  src: [
    {
      path: '../style/fonts/FC Subject Rounded Regular [Non-commercial use].ttf',
      weight: '400',
    },
    {
      path: '../style/fonts/FC Subject Rounded Bold [Non-commercial use].ttf',
      weight: '700',
    },
  ],
  variable: '--font-subjectRounded'
});

export const metadata = {
  title: 'T-rak',
  description: 'Tierlist x Like',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={subjectRounded.className + ' bg-cherry'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
