import Sequelize, { Model } from 'sequelize';

export default class ItemCategory extends Model {
  static init(sequelize) {
    super.init({
      id_item: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Id do Item deve ser um número inteiro',
          },
        },
      },
      id_category: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Id da Categoria deve ser um número inteiro',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'items_category',
    });
    return this;
  }
}
