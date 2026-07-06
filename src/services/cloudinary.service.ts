import { cloudinary } from '../config/cloudinary';

type CloudinaryResourceType = 'image' | 'raw';

/**
 * Uploads an image buffer to Cloudinary under the given folder.
 * Returns the secure URL and public ID of the uploaded asset.
 */
export const uploadImage = (buffer: Buffer, folder: string): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

export const uploadPortfolioAsset = (
  buffer: Buffer,
  folder: string,
  mimeType: string
): Promise<{ url: string; publicId: string; resourceType: CloudinaryResourceType }> => {
  const resourceType: CloudinaryResourceType = mimeType === 'application/pdf' ? 'raw' : 'image';

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
        resolve({ url: result.secure_url, publicId: result.public_id, resourceType });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Deletes an image from Cloudinary by its public ID.
 */
export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const deleteAsset = async (
  publicId: string,
  resourceType: CloudinaryResourceType = 'image'
): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
