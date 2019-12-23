import user from '../../core/userManagement';

const findBasicInfoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const info = await user.findUserById(id);
    res.json(info);
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};

export default findBasicInfoById;
