module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'items',
    'description',
    {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: false,
    },
  ),

  down: () => {},
};
