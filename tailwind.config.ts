import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['var(--font-lato)'],
        serif: ['var(--font-playfair)'],
        display: ['var(--font-playfair-display)']
      },
      keyframes: {
        "slide": {
          from: {
            transform: 'translateX(-200px)',
            opacity: '0',
          },
          
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        }  
      },
      backgroundImage: {
        'home-img': "url('/images/Elegant_Background-4.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-bg": "var(--main-bg)",
        "btn-more": "var(--dark-gray)",
        "btn-more-hover": "var(--light-gray)",
        "text-blue": "var(--dark-blue)",
        "text-red": "var(--header)",
      },
      animation: {
        'slide': 'slide 1.2s ease-in-out'
      },
    },
  },
  plugins: [],
} satisfies Config;
