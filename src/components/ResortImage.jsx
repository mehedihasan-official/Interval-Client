import React, { useState, useEffect } from "react";
import { getFallbackImage, resolveImage } from "../utils/resortImages";

/**
 * ResortImage — a drop-in <img> replacement that:
 *  1. Shows a skeleton placeholder while the image loads.
 *  2. Replaces broken / empty URLs with a deterministic fallback from
 *     the RESORT_FALLBACK_IMAGES collection.
 *  3. Re-syncs correctly when the src prop changes (e.g. carousel navigation).
 *
 * Props:
 *  @param {string}   src        - Original image URL from the database
 *  @param {string}   alt        - Alt text
 *  @param {string}   seed       - Seed for consistent fallback selection (use resort._id or resortName)
 *  @param {string}   className  - Tailwind / CSS classes forwarded to the wrapper div
 *  @param {function} onClick    - Click handler forwarded to the wrapper div (for thumbnails etc.)
 *  @param {object}   rest       - Any other props forwarded to <img>
 */
const ResortImage = ({ src, alt = "Resort", seed = "", className = "", onClick, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(() => resolveImage(src, seed));
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Re-sync whenever the src prop changes (carousel switching images)
  useEffect(() => {
    setImgSrc(resolveImage(src, seed));
    setLoaded(false);
    setErrored(false);
  }, [src, seed]);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      const fallback = getFallbackImage(seed);
      if (imgSrc !== fallback) {
        setImgSrc(fallback);
      }
    }
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
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </div>
  );
};

export default ResortImage;