import uuid from 'uuid/v5';
import db from '../models';
import msg from '../assets/errorMessages';

const { User } = db;

const findUserById = async (id) => {
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
  try {
    const newUserInfo = {
      authority: '손님',
      reputation: 0,
      numberOfRater: 0,
      id: uuid(info.email, uuid.DNS),
      ...info,
    };
    const newUser = await User.create(newUserInfo);
    return newUser;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkExistMember = async ({ name, email }) => {
  try {
    const member = await User.findOne({ where: { email } });
    if (member !== null) {
      const result = member.dataValues;
      const fields = [
        'id',
        'name',
        'email',
        'authority',
        'latitude',
        'longitude',
        'reputation',
        'numberOfRater',
      ];
      const info = Object.keys(result)
        .filter((key) => fields.includes(key))
        .reduce((acc, cur) => Object.assign(acc, { [cur]: result[cur] }), {});

      return info;
    }
    return { name, email };
  } catch (e) {
    throw new Error(msg.ErrorWhenCheckMember);
  }
};

const deleteMember = async (id) => {
  try {
    User.destroy({ where: { id } });
  } catch (e) {
    throw new Error(e);
  }
};
export default {
  addUser, checkExistMember, findUserById, deleteMember,
};
