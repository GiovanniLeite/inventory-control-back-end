import multer from 'multer';
import multerConfig from '../config/multerConfig';

import FotoVideo from '../models/FotoVideo';

const upload = multer(multerConfig).single('fotoVideo');

class FotoVideoController {
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
        const fotoVideo = await FotoVideo.create({ originalname, filename, id_item });

        return res.json(fotoVideo);
      } catch (e) {
        return res.status(400).json({
          errors: ['Item não existe'],
        });
      }
    });
  }
}

export default new FotoVideoController();
