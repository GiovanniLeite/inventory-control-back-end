import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// todo model tera que ser importado aqui
import User from '../models/User';
import Category from '../models/Category';
import Item from '../models/Item';
import FotoVideo from '../models/FotoVideo';
import ItemCategory from '../models/ItemCategory';

const models = [User, Category, Item, FotoVideo, ItemCategory];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
