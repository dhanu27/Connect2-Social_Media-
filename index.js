const express = require("express");
const app = express();
const logger = require("morgan");
const env = require("./config/enviornment");
const cookieParser = require("cookie-parser");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const kue = require("./config/kue");
const path = require("path");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passort-local-auth");
const passportJWT = require("./config/passport-jwt");
const MongoStore = require("connect-mongodb-session")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const custMiddleware = require("./config/middleware");
// const Noty = require('noty');

/* Set up a chat Server */

const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_socket").chatSocket(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on 5000");
if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.assets_path, "scss"),
      dest: path.join(__dirname, env.assets_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("." + env.assets_path));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "connect",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

app.use(flash());
app.use(custMiddleware.setFlash);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(process.env);
  console.log(`Server is running on port: ${port}`);
});
