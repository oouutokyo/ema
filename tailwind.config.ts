import { stick } from '@/lib/generateEma/fonts';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
        },
      },
      backgroundImage: {
        asanoha: "url('/images/asanoha.svg')",
      },
      fontFamily: {
        hinaMincho: ['var(--font-hinaMincho)'],
        sawarabiMincho: ['var(--font-sawarabiMincho)'],
        ysabeauSC: ['var(--font-ysabeauSC)'],
        stick: ['var(--font-stick)'],
        delaGothicOne: ['var(--font-delaGothicOne)'],
        bungeeHairline: ['var(--font-bungeeHairline)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
