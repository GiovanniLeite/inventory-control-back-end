import Sequelize, { Model } from 'sequelize';

export default class Item extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      km: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      other: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      brand: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      date_release: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      new: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        validate: {
          isBoolean: {
            msg: 'Novo/Usado deve ser um booleano.',
          },
        },
      },
      custom_code: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Quantidade deve ser um número inteiro',
          },
        },
      },
      country_manufactury: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      date_purchase: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      date_sale: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      price_purchase: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      price_sale: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      price_my: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      is_item: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        validate: {
          isBoolean: {
            msg: 'is_item deve ser um booleano.',
          },
        },
      },
      is_car: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            msg: 'is_car deve ser um booleano.',
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      id_main_category: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      id_sub1_category: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      id_sub2_category: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'items',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'id_item' });
  }

  isBoolean(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Deve ser um booleano');
    }
  }
}
