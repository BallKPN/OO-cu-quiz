const { check } = require("express-validator");
const router = require("express").Router();

const userController = require("../controllers/User");
const jwtValidate = require("../middleware/jwtValidate");

router.get("/", userController.getUsers); //ไว้เช็ค User เฉยๆ
router.get("/:user_id", jwtValidate, userController.getUser);

router.post(
  "/login",
  [
    check("username", "โปรดกรอกชื่อผู้ใช้").notEmpty(),
    check("password", "โปรดกรอกรหัสผ่าน").notEmpty(),
  ],
    userController.login
);

router.post(
  "/signup", 
  [
    check("username", "โปรดกรอกชื่อผู้ใช้").notEmpty(),
    check("password", "โปรดกรอกรหัสผ่าน").notEmpty(),
    check("repassword", "โปรดกรอกรหัสผ่าน").notEmpty(),
  ],
    userController.signup
);

module.exports = router;