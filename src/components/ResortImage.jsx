import { useState, useEffect } from "react";

/**
 * ResortImage — a drop-in <img> replacement that shows a skeleton while the
 * image loads and leaves failed image URLs visible as broken images.
 *
 * Props:
 *  @param {string}   src        - Original image URL from the database
 *  @param {string}   alt        - Alt text
 *  @param {string}   className  - Tailwind / CSS classes forwarded to the wrapper div
 *  @param {function} onClick    - Click handler forwarded to the wrapper div (for thumbnails etc.)
 *  @param {object}   rest       - Any other props forwarded to <img>
 */
const ResortImage = ({ src, alt = "Resort", className = "", onClick, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(!src);

  // Reset the loading state whenever the src prop changes.
  useEffect(() => {
    setErrored(!src);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    setErrored(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ display: "block" }}
      onClick={onClick}
    >
      {/* Skeleton shimmer shown while image is loading */}
      {!loaded && !errored && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}
      <img
        src={src || undefined}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded || errored ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </div>
  );
};

export default ResortImage;