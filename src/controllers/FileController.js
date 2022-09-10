import multer from 'multer';
import multerConfig from '../config/multerConfig';

import File from '../models/File';

const upload = multer(multerConfig).single('file');

class FileController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { id_item } = req.body;
        const file = await File.create({ originalname, filename, id_item });

        return res.json(file);
      } catch (e) {
        return res.status(400).json({
          errors: ['Item não existe'],
        });
      }
    });
  }
}

export default new FileController();
