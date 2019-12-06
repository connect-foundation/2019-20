import db from "../../models";
import uri from "../../assets/uris";

const addUser = async (req, res, next) => {
  const { User } = db;
  const { email, name } = res.locals;
  const { latitude, longitude } = req.body;
  console.log(name, email, latitude, longitude);
  try {
    const newUser = await User.create({
      name,
      email,
      latitude,
      longitude,
      authority: "손님"
    });
    res.locals = { newUser };
    next();
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};

const checkExistMember = async (req, res, next) => {
  const { name, email } = res.locals;
  const { User } = db;
  try {
    const member = await User.findOne({
      where: { email }
    });
    if (member !== null) {
      const { id, authority, latitude, longitude } = member.dataValues;
      res.locals = {
        id,
        name,
        email,
        authority,
        latitude,
        longitude
      };
      next();
    } else {
      res.locals = { name, email };
      next();
    }
  } catch (e) {
    res.redirect(uri.client500ErrorPage);
  }
};

export { addUser, checkExistMember };
