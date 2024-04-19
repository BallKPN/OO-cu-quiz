const JWT = require("jsonwebtoken");

const jwtValidate = (req, res, next) => {
    try {
      if (!req.headers["authorization"]) return res.sendStatus(401)
  
      const token = req.headers["authorization"].replace("Bearer ", "")
  
      JWT.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) throw new Error(error)

        req.user = decoded
        delete req.user.exp
        delete req.user.iat
      })
      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }

const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401)
    const token = req.headers["authorization"].replace("Bearer ", "")
    JWT.verify(token, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) throw new Error(error)

      req.user = decoded
      req.user.token = token
      delete req.user.exp
      delete req.user.iat
      console.log(req.user)
    })
    next()
  } catch (error) {
    return res.sendStatus(403)
  }
}
  
const jwtGenerate = (username, name) => {
  const accessToken = JWT.sign(
    {
      username,
      name,
    },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_EXP_TIME,
    }
  );
  return accessToken;
};

module.exports = { jwtValidate, jwtRefreshTokenValidate, jwtGenerate }