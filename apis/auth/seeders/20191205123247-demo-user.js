module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: '여재환',
        email: 'jae3132@naver.com',
        authority: '황제',
        latitude: 37.499101,
        longitude: 127.028177,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
