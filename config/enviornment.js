const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");
const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  assets_path: "/assests",
  session_cookie_key: "blahsomething",
  db: "Connect2_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "bhardwajdhanu08@gmail.com",
      pass: "%%%%%UserPassword%%%%",
    },
  },
  jwt_key: "Connect2",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: "production",
  assets_path: process.env.ASSETS_PATH,
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: process.env.Connect2_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  },
  jwt_key: process.env.jwt_key,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};
module.exports =
  eval(process.env.NODE_ENV) == "undefined"
    ? development
    : eval(process.env.NODE_ENV);
