import { join } from 'path';
import { getFileToBuffer } from './get-file-to-buffer';

export const getPhoto = async () => {
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, 'photo-1-games.jpeg'),
  );
  const photo: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'photo-1-games.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1024 * 500,
    stream,
    destination: '',
    filename: 'filename',
    path: 'filepath',
    buffer: buffer,
  };

  return photo;
};
