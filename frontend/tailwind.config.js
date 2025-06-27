/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghibliBg: '#f5ecd7', // 米黄色
        ghibliGreen: '#8a9a5b', // 柔和绿色
        ghibliBrown: '#a67c52', // 木色
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        ptsans: ['PT Sans', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      }
    },
  },
  plugins: [],
  safelist: [
    'm-4', 'm-2', // 手动添加
    { pattern: /m-\d/ } // 或正则匹配
  ]
} 