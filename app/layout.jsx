import './globals.css';
import Providers from './providers.jsx';
import localFont from 'next/font/local';

const subjectRounded = localFont({
  src: '../style/fonts/fc_subject_rounded_bold_non-commercial_use-webfont.woff',
  display: 'swap',
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
