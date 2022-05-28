module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('items_category', {
    id_item: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'items',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
    id_category: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('items_category'),
};
