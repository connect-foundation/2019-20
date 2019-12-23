import user from '../../core/userManagement';
import msg from '../../assets/errorMessages';

const addUser = async (req, res, next) => {
  if (res.locals.info === null) {
    next({ status: 400, message: msg.badRequest });
    return;
  }

  const { email, name } = res.locals.info;
  const { latitude, longitude } = req.body;
  const info = {
    email,
    name,
    latitude,
    longitude,
  };
  try {
    const { dataValues } = await user.addUser(info);
    res.locals = { ...dataValues };
    next();
  } catch (err) {
    if (err.message === msg.validationError) {
      next({ status: 400, message: err.message });
    } else {
      next({ status: 500, message: err.message });
    }
  }
};

const checkExistMember = async (req, res, next) => {
  const { name, email } = res.locals;
  try {
    const info = await user.checkExistMember({ name, email });
    res.locals = { ...info };
    next();
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};

const deleteUserInfo = async (req, res, next) => {
  const { info } = res.locals;
  if (info === null || !info.id || !info.id.length) {
    next({ status: 400, message: msg.invalidJwtToken });
    return;
  }

  try {
    await user.deleteMember(info.id);
    next();
  } catch (e) {
    next({ status: e.status, message: e.message });
  }
};
export { addUser, checkExistMember, deleteUserInfo };
