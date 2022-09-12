module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('items', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      km: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      other: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_release: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      new: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      custom_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      country_manufactury: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_purchase: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_sale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price_purchase: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price_sale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price_my: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_item: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_car: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_main_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_sub1_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_sub2_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('items'),
};
