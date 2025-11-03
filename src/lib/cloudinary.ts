import type { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryUploadOptions {
  buffer: Buffer<ArrayBuffer>;
  resourceType: UploadApiOptions['resource_type'];
  uploadPreset: UploadApiOptions['upload_preset'];
}

export async function uploadFileToCloudinary({
  buffer,
  resourceType,
  uploadPreset,
}: CloudinaryUploadOptions): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: resourceType,
          upload_preset: uploadPreset,
        },
        (error, results) => {
          if (error) {
            return reject(error);
          }

          resolve(results as UploadApiResponse);
        },
      )
      .end(buffer);
  });
}
