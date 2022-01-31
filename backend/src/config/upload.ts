import path = require('path');
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';

export const storage = {
  storage: diskStorage({
    destination: './tmp',
    filename: (req, file, cb) => {
      const fileHash = randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
