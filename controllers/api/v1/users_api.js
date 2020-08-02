const User = require("../../../models/usersDB");
const JSONwebtoken = require("jsonwebtoken");
const env = require("../../../config/enviornment");

module.exports.createSession = async function (req, res) {
  console.log(req.body.email);
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      res.status(422).json({
        message: "Invalid username/password",
      });
    } else {
      res.status(200).json({
        data: {
          token: JSONwebtoken.sign(user.toJSON(), env.jwt_key, {
            expiresIn: 100000,
          }),
        },
      });
    }
  } catch (err) {
    console.log("#####Error######", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
