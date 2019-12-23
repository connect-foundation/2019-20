module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    authority: {
      type: Sequelize.ENUM,
      values: ['황제', '관리자', '손님'],
      allowNull: false,
      defaultValue: '손님',
    },
    latitude: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    longitude: {
      allowNull: false,
      type: Sequelize.DOUBLE,
    },
    reputation: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    numberOfRater: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
