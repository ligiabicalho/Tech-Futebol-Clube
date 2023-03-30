module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: 'team_name',
      }, 
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');

  }
};
