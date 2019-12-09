import user from '../../core/userManagement';
import msg from '../../assets/errorMessages';

const addUser = async (req, res, next) => {
  const { email, name } = res.locals.info;
  const { latitude, longitude } = req.body;
  const info = {
    email, name, latitude, longitude,
  };
  try {
    const newUser = await user.addUser(info);
    res.locals = { newUser };
    next();
  } catch (err) {
    if (err.message === msg.badRequest) {
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
    res.locals = { info };
    next();
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};

export { addUser, checkExistMember };
