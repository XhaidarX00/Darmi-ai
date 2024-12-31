/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Untuk file di folder app (Next.js app directory)
    './components/**/*.{js,ts,jsx,tsx}',  // Untuk komponen-komponen di folder components
    // './pages/**/*.{js,ts,jsx,tsx}',  // Jika kamu juga punya folder pages
  ],
  theme: {
    extend: {
      colors: {
        'navbar-bg': '#00aaff',
        'navbar-text': '#ffffff',
        'navbar-hover': '#0088cc',
        '_footer-bg': '#16423C',
        '_footer-text': '#E9EFEC',
        'footer-link-hover': '#6A9C89',
        'icon_mic': '#C4DAD2',
        'icon_mic_hover': '#16423C',
        // 'icon_mic_new': '#cc7c04',
        'icon_mic_new': '#f008c8',
      },
    },
  },
  plugins: [],
}
