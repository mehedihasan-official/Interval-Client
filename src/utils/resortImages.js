/**
 * Collection of high-quality resort/vacation property fallback images.
 * These are used when a resort's stored image URL is broken or unavailable.
 * All images are from Unsplash (free to use, no attribution required for display).
 */
export const RESORT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",  // Luxury pool resort
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",  // Beach resort
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",  // Mountain resort
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",  // Ocean view resort
  "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",  // Tropical resort
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",  // Desert resort
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",  // Overwater bungalows
  "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80",  // Ski resort
  "https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=800&q=80",  // Resort lobby
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",  // Hotel pool
  "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&q=80",  // Jungle resort
  "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80",  // Coastal resort
  "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&q=80",  // Lake resort
  "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",  // Bali resort
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",  // Caribbean resort
];

/**
 * Returns a deterministic fallback image URL based on a seed string (e.g. resort ID or name).
 * Using a seed ensures the same resort always gets the same fallback image — not random per render.
 * @param {string} seed - A string to derive the index from (resort._id or resort.resortName)
 * @returns {string} A fallback image URL
 */
export function getFallbackImage(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return RESORT_FALLBACK_IMAGES[hash % RESORT_FALLBACK_IMAGES.length];
}

/**
 * Returns a resolved image URL: the original if it looks valid, or a fallback.
 * This is a synchronous check — it only catches obviously empty/null values.
 * For full async URL validation use the useResortImage hook instead.
 * @param {string} url - The original image URL from the database
 * @param {string} seed - A seed for consistent fallback selection
 * @returns {string} The original URL if non-empty, else a fallback
 */
export function resolveImage(url, seed = "") {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return getFallbackImage(seed);
  }
  return url;
}
