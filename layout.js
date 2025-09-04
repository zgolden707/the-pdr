/**
 * Root layout component for The PDR site.
 *
 * This file defines the outer HTML structure and metadata for every page.  We
 * import the global CSS file here so Tailwind classes apply throughout the
 * application.  The metadata includes a sensible default title and
 * description; these values can be overridden at the page level if needed.
 */
import './globals.css';

export const metadata = {
  title: 'The PDR',
  description: 'New York City dining, in the palm of your hand',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}