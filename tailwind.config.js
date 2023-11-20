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
        darkblack: '#464646',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.625rem',
        '4xl': '2.441rem',
        '5xl': '3rem',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.625rem',
        '4xl': '2.441rem',
        '5xl': '3rem',
      },
      fontFamily:{
        subjectRounded: ['var(--font-subjectRounded)']
      },
      borderRadius: {
        '2xl': '15px'
      },
      boxShadow: {
        'lg': '0 4px 4px 0px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [ nextui(), require('react-widgets-tailwind') ]
};
