/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'kybezrcrglmoaycmmomr.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
