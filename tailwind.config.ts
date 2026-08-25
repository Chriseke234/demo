import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aurelia: {
          bg:       '#FDFBF7',
          text:     '#1A1A1A',
          gold:     '#B39268',
          goldLight:'#C5A880',
          sand:     '#F4F0EA',
          sandDark: '#EAE3D8',
          charcoal: '#121212',
          forest:   '#2C4A3E',
          amber:    '#C28F5A',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)',    'Inter', 'system-ui', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
};

export default config;
