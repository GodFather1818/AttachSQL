import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Express } from 'express';
import { Readable } from 'stream'; // Import stream
import './cloudinary.config'
@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'products' }, // Optional: specify a folder
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      // Convert buffer to stream and pipe to Cloudinary
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null); // End of the stream
      readable.pipe(uploadStream);
    });
  }
}
