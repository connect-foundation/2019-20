import db from '../models';
import msg from '../assets/errorMessages';

const findUserById = async (id) => {
  const { User } = db;
  try {
    const { dataValues } = await User.findOne({
      where: { id },
      attributes: ['name', 'reputation', 'numberOfRater'],
    });
    return dataValues;
  } catch (e) {
    throw new Error(msg.internalError);
  }
};

const addUser = async (info) => {
  const { User } = db;
  try {
    const newUserInfo = {
      authority: '손님',
      reputation: 0,
      numberOfRater: 0,
      ...info,
    };
    const newUser = await User.create(newUserInfo);
    return newUser;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkExistMember = async ({ name, email }) => {
  const { User } = db;

  try {
    const member = await User.findOne({ where: { email } });
    if (member !== null) {
      const {
        id,
        authority,
        latitude,
        longitude,
        reputation,
        numberOfRater,
      } = member.dataValues;
      return {
        id,
        name,
        email,
        authority,
        latitude,
        longitude,
        reputation,
        numberOfRater,
      };
    }
    return { name, email };
  } catch (e) {
    throw new Error(msg.ErrorWhenCheckMember);
  }
};

export default { addUser, checkExistMember, findUserById };
