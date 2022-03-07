const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(cors());
app.use(express.json());
const nodemailer = require("nodemailer");

app.post("/register", (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    //const val = Math.floor(1000 + Math.random() * 9000);
    const id = String(uuidv4());
    console.log(id);
    db.query(
      `INSERT INTO STUDENTS_NEW VALUES('${req.body.email}', '${req.body.password}', '${req.body.name}', '${id}')`,
      (err, result) => {
        if (result) {
          console.log(result);
          const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            pool: true,
            port: 587,
            auth: {
              user: "communications@inradius.in",
              pass: "IR@CI_2022",
            },
          });
          let mailOptions = {
            from: "OTP <communications@inradius.in>",
            to: req.body.email,
            subject: "Otp Verification",
            html: `${id}`,
            //body: "hello",
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              return res.json("Error");
            } else {
              return res.json("Success");
            }
          });
          //res.json(result);
        } else if (err) return res.json("Error");
      }
    );
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
    return res.json("Error");
  }
});

app.post("/login", (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    console.log(req.body.email);
    console.log(req.body.password);
    db.query(
      `SELECT * FROM students_new WHERE email = ? AND password = ?`,
      [req.body.email, req.body.password],
      (err, results) => {
        if (results) {
          return res.json(results);
        } else {
          return res.json(err);
        }
        //else if (err) res.json(err);
      }
    );
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

app.post("/email-verification", (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    console.log(req.body.otp);
    db.query(
      `SELECT * FROM students_new WHERE uuid = ?`,
      [req.body.otp],
      (err, results) => {
        if (results) {
          return res.json(results);
        } else {
          return res.json(err);
        }
        //else if (err) res.json(err);
      }
    );
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => console.log("Server Started"));
