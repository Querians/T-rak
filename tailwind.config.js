const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    require.resolve('react-widgets/styles.css'),
  ],
  theme: {
    extend: {
      colors: {
        mint: '#c8ebd0',
        cherry: '#de717c',
        peach: '#f8afb1',
        lightpink: '#f6d8df',
        cream: '#fbf3e2',
        winered: '#a73440',
        darkgrey: '#464646',
      },
    },
  },
  plugins: [ nextui(), require('react-widgets-tailwind') ]
};
