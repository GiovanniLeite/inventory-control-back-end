module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.renameTable('foto_video', 'file', { transaction: t }),
          ])
      })
  },

  down: () => {},
};
