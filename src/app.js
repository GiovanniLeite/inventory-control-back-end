import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import cors from 'cors';
// import helmet from 'helmet';
import delay from 'express-delay';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';

import categoryRoutes from './routes/categoryRoutes';
import itemRoutes from './routes/itemRoutes';
import fotoVideoRoutes from './routes/fotoVideoRoutes';
import itemCategoryRoutes from './routes/itemCategoryRoutes';

// front url
const whiteList = [
  'http://localhost:3000',
  'http://localhost',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
};
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    // this.app.use(helmet());
    // this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/categories/', categoryRoutes);
    this.app.use('/items/', itemRoutes);
    this.app.use('/fotoVideos/', fotoVideoRoutes);
    this.app.use('/itemCategories/', itemCategoryRoutes);
  }
}

export default new App().app;
