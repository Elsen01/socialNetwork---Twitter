import * as fs from 'fs';
import { File } from '../shared/file';
import { HttpException, HttpStatus } from '@nestjs/common';

const fsPromise = fs.promises;

export class FileHelper {
  static async createImage(file: File) {
    const mimetypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const filterMime = mimetypes.filter((mime) => mime === file.mimetype);
    console.log(filterMime);
    if (filterMime.length === 0) {
      throw new HttpException(
        `The pattern does not match`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await fsPromise.writeFile(
      'upload/images/' + file.originalname,
      file.buffer,
    );
  }
}
