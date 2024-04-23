const { validationResult } = require("express-validator");

const User = require("../model/User");

const bcrypt = require("bcrypt");
const { jwtGenerate } = require("../middleware/jwt");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const errors = validationResult(req);

  //If errors are present
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  //Check username & password
  try {
    const user = await User.findOne({ username }).exec();
    const isMatch = await bcrypt.compare(password, user.password);
    if (user === null || !isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          },
        ],
      });
    }
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        },
      ],
    });
  }

  //JWT
  const access_token = jwtGenerate(username, user.name);

  res.json({
    access_token,
    access_token_exp: new Date(
      parseInt(Date.now()) + parseInt(process.env.ACCESS_EXP_TIME)
    ).toISOString(),
  });
};

exports.signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  await User.findOne({ username })
    .then((userDoc) => {
      if (userDoc) {
        return res.json("มีชื่อผู้ใช้นี้แล้ว");
      }
      if (password === repassword) {
        return bcrypt.hash(password, 12).then((hashedPassword) => {
          const name = { firstName, lastName };
          const user = new User({
            username,
            password: hashedPassword,
            name,
          });
          user.save();
          const access_token = jwtGenerate(username, name);
          return res.json({ access_token });
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.getUser = async (req, res) => {
  const id = req.params.user_id;
  try {
    const user = await User.findOne({ id }).exec();
    res.json(user);
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
        },
      ],
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  }
  catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
        },
      ],
    });
  }
};