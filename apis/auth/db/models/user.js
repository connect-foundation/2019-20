module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      authority: DataTypes.ENUM('황제', '관리자', '손님'),
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      reputation: DataTypes.INTEGER,
      numberOfRater: DataTypes.INTEGER,
    },
    {},
  );
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
