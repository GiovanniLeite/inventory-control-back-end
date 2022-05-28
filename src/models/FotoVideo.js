import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class FotoVideo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não deve ficar vazio.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não deve ficar vazio.',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'foto_video',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Item, { foreignKey: 'id_item' });
    // caso a referencia fosse no model de aluno seria o msm metodo
    // sem a linha de cima, mas com a linha de baixo
    // this.hasOne(models.Foto, { foreignKey: 'aluno_id' });
  }
}
