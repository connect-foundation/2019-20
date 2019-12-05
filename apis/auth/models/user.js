module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      authority: DataTypes.ENUM('황제', '관리자', '손님'),
      location: DataTypes.GEOMETRY('POINT'),
    },
    {},
  );
  // eslint-disable-next-line no-unused-vars
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
