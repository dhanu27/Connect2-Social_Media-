const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const env = require("./enviornment");
// async..await is not allowed in global scope, must use a wrapper

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(env.smtp);
let renderTemplate = (data, relativePath) => {
  let mailTemplate;
  ejs.renderFile(
    path.join(__dirname, "../views/mailer", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in render mailer template", err);
        return;
      }
      mailTemplate = template;
    }
  );
  return mailTemplate;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
