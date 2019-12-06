import express from "express";

import jwtValidator from "./middlewares/jwtValidator";
import {
  getUserInfoByJWT,
  logOutProcess,
  login
} from "./controller/loginControl";
import { addUser } from "./middlewares/userManagement";

const router = express.Router();

router.get("/", (req, res) => res.send("Welcome to 폴 auth server"));
router.get("/myInfo", jwtValidator, getUserInfoByJWT);
router.post("/addUser", jwtValidator, addUser, login);
router.get("/logout", logOutProcess);

module.exports = router;
