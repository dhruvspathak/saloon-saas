/**
 * Image Management Utility
 * Handles image paths and isolation per site
 * Uses structure: /public/sites/{slug}/gallery
 *                 /public/sites/{slug}/before-after
 */

/**
 * Get base image path for a site
 * @param {string} siteSlug - Site slug
 * @returns {string} Base path for site images
 */
export function getSiteImageBasePath(siteSlug) {
  if (!siteSlug) {
    console.warn('Site slug not provided');
    return '/sites/default';
  }
  return `/sites/${siteSlug}`;
}

/**
 * Get gallery image path for a site
 * @param {string} siteSlug - Site slug
 * @param {string} [filename] - Optional: specific image filename
 * @returns {string} Gallery path
 */
export function getSiteGalleryPath(siteSlug, filename = '') {
  const basePath = getSiteImageBasePath(siteSlug);
  return filename ? `${basePath}/gallery/${filename}` : `${basePath}/gallery`;
}

/**
 * Get before-after image path for a site
 * @param {string} siteSlug - Site slug
 * @param {string} [filename] - Optional: specific image filename
 * @returns {string} Before-after path
 */
export function getSiteBeforeAfterPath(siteSlug, filename = '') {
  const basePath = getSiteImageBasePath(siteSlug);
  return filename ? `${basePath}/before-after/${filename}` : `${basePath}/before-after`;
}

/**
 * Transform image URL to use site-based path
 * Converts: /gallery/image.jpg → /sites/{slug}/gallery/image.jpg
 * @param {string} siteSlug - Site slug
 * @param {string} imageUrl - Original image URL
 * @param {string} type - Image type: 'gallery' or 'before-after'
 * @returns {string} Transformed image URL
 */
export function transformImageUrl(siteSlug, imageUrl, type = 'gallery') {
  if (!imageUrl) return '';

  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If it's relative path, transform it
  if (imageUrl.startsWith('/')) {
    const filename = imageUrl.split('/').pop();
    if (type === 'before-after') {
      return getSiteBeforeAfterPath(siteSlug, filename);
    }
    return getSiteGalleryPath(siteSlug, filename);
  }

  // Assume it's a filename
  if (type === 'before-after') {
    return getSiteBeforeAfterPath(siteSlug, imageUrl);
  }
  return getSiteGalleryPath(siteSlug, imageUrl);
}

/**
 * Transform array of images to use site-based paths
 * @param {string} siteSlug - Site slug
 * @param {array} images - Array of image URLs or objects
 * @param {string} type - Image type: 'gallery' or 'before-after'
 * @returns {array} Transformed images
 */
export function transformImages(siteSlug, images = [], type = 'gallery') {
  if (!Array.isArray(images)) return [];

  return images.map((image) => {
    if (typeof image === 'string') {
      return transformImageUrl(siteSlug, image, type);
    }

    // If it's an object with image properties
    if (typeof image === 'object' && image !== null) {
      const transformed = { ...image };

      if (image.url) {
        transformed.url = transformImageUrl(siteSlug, image.url, type);
      }

      if (image.before) {
        transformed.before = transformImageUrl(siteSlug, image.before, 'before-after');
      }

      if (image.after) {
        transformed.after = transformImageUrl(siteSlug, image.after, 'before-after');
      }

      return transformed;
    }

    return image;
  });
}

/**
 * Get image upload directory for a site
 * For use in admin upload interfaces
 * @param {string} siteSlug - Site slug
 * @param {string} type - Image type: 'gallery' or 'before-after'
 * @returns {string} Upload directory path
 */
export function getImageUploadDirectory(siteSlug, type = 'gallery') {
  const basePath = getSiteImageBasePath(siteSlug);

  if (type === 'before-after') {
    return `${basePath}/before-after/`;
  }

  return `${basePath}/gallery/`;
}

/**
 * Generate consistent image path for any type
 * @param {string} siteSlug - Site slug
 * @param {string} type - Type: 'gallery', 'before-after', 'hero', etc.
 * @param {string} [filename] - Optional: specific filename
 * @returns {string} Image path
 */
export function getSiteImagePath(siteSlug, type = 'gallery', filename = '') {
  const basePath = getSiteImageBasePath(siteSlug);
  const directory = filename ? `${basePath}/${type}/${filename}` : `${basePath}/${type}`;
  return directory;
}

/**
 * Validate image filename (security check)
 * @param {string} filename - Filename to validate
 * @returns {boolean} Whether filename is valid
 */
export function isValidImageFilename(filename) {
  if (!filename || typeof filename !== 'string') return false;

  // Allow only alphanumeric, dots, underscores, and hyphens
  const validPattern = /^[a-zA-Z0-9._-]+$/;
  return validPattern.test(filename);
}

/**
 * Create image config object for site
 * @param {string} siteSlug - Site slug
 * @param {array} galleryImages - Gallery image filenames
 * @param {array} beforeAfterImages - Before/after image objects
 * @returns {object} Image configuration
 */
export function createImageConfig(siteSlug, galleryImages = [], beforeAfterImages = []) {
  return {
    gallery: transformImages(siteSlug, galleryImages, 'gallery'),
    beforeAfter: transformImages(siteSlug, beforeAfterImages, 'before-after'),
    uploadDirs: {
      gallery: getImageUploadDirectory(siteSlug, 'gallery'),
      beforeAfter: getImageUploadDirectory(siteSlug, 'before-after'),
    },
  };
}

export default {
  getSiteImageBasePath,
  getSiteGalleryPath,
  getSiteBeforeAfterPath,
  transformImageUrl,
  transformImages,
  getImageUploadDirectory,
  getSiteImagePath,
  isValidImageFilename,
  createImageConfig,
};
