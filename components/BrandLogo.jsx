/**
 * BrandLogo component
 *
 * Renders the company logo.  The user supplied an SVG for the logo which is
 * placed in the `/public` directory as `PDR.svg`.  This component accepts 
 * an optional `size` prop that controls the height of the logo in pixels; the
 * width will scale proportionally.  If the SVG cannot be loaded (for
 * example, if the file is missing) the component falls back to rendering a
 * simple text mark in the brand colour.
 */
export default function BrandLogo({ size = 80 }) {
  return (
    <img
      src="/PDR.svg"
      alt="The PDR logo"
      style={{ width: `${size}px`, height: 'auto' }}
      onError={(e) => {
        // Fallback: replace the src with an inline SVG displaying the text
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="none"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="64" font-family="Cormorant Garamond, serif" fill="#0A2E60">The PDR</text></svg>`);
      }}
    />
  );
}
