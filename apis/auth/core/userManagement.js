import db from '../models';
import msg from '../assets/errorMessages';

const addUser = async (info) => {
  const { User } = db;
  try {
    const newUser = await User.create(info);
    return newUser;
  } catch (e) {
    throw new Error(msg.internalError);
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

export default { addUser, checkExistMember };
