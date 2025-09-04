/**
 * Tailwind CSS configuration for The PDR site.
 *
 * We define a custom colour palette matching the brand colours provided by the user.  The
 * `brand` colour corresponds to the navy used in the logo and `beige` is the soft
 * background tone.  This configuration also instructs Tailwind to scan all files in
 * the `app` and `components` directories so unused styles are purged correctly.
 */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0A2E60',
        beige: '#EBE4DF',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};