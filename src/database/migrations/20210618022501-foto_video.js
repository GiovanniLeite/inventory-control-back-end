module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('foto_video', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    originalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_item: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'items',
        key: 'id',
      },
      onDelete: 'SET NULL', // CASCADE - ERASE THE RECORD FROM THIS TABLE TOGETHER
      onUpdate: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('foto_video'),
};
