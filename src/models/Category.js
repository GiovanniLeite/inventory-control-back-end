import Sequelize, { Model } from 'sequelize';

export default class Category extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Categoria já existe',
        },
        validate: {
          len: {
            args: [3, 255],
            msg: 'O Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      id_parent: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'id_parent deve ser um número.',
          },
        },
      },
      id_parent_parent: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'id_parent_parent deve ser um número.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'category',
    });
    return this;
  }
}
