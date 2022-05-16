const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(cors());
app.use(express.json());
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    try {
      const stat = await JWT.verify(token, "testkey", (err, decoded) => {
        req.email = decoded.email;
        next();
      });
    } catch (e) {
      return res.json(e);
    }
  }
};
app.post("/register", (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    //const val = Math.floor(1000 + Math.random() * 9000);
    const id = String(uuidv4()).slice(0, 4);
    const email = ""; //Enter your email here
    const password = ""; //Enter your password here
    console.log(id);
    db.query(
      `INSERT INTO STUDENTS_NEW VALUES('${req.body.email}', '${req.body.password}', '${req.body.name}', '${id}', '${req.body.role}', '${req.body.class}')`,
      (err, result) => {
        if (result) {
          console.log(result);
          const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            pool: true,
            port: 587,
            auth: {
              user: email,
              pass: password,
            },
          });
          let mailOptions = {
            from: "OTP",
            to: req.body.email,
            subject: "Otp Verification",
            html: `${id}`,
            //body: "hello",
          };
          transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
              //console.log(err);
              console.log(err);
              return res.json("Error");
            } else {
              return res.json({
                msg: "Success",
              });
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

app.post("/login", async (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    console.log(req.body.email);
    console.log(req.body.password);
    if (req.body.email === "admin@admin.com" && req.body.password === "admin") {
      const token = await JWT.sign({ email: req.body.email }, "testkey");
      return res.json({
        msg: "Success",
        token: token,
      });
    } else {
      db.query(
        `SELECT * FROM students_new WHERE email = ? AND password = ? AND role = ?`,
        [req.body.email, req.body.password, req.body.role],
        async (err, results) => {
          if (results.length == 0) {
            return res.json({ msg: "Error" });
          } else {
            const token = await JWT.sign({ email: req.body.email }, "testkey");
            return res.json({
              msg: "Success",
              token: token,
            });
          }
          //else if (err) res.json(err);
        }
      );
    }
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

app.get("/user-info", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `SELECT * FROM students_new WHERE email = ?`,
      [req.email],
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

app.get("/get-users", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(`SELECT * FROM students_new`, (err, results) => {
      if (results) {
        console.log(results);
        return res.json(results);
      } else {
        return res.json(err);
      }
      //else if (err) res.json(err);
    });
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-user", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    console.log(req.body.email);
    db.query(
      `DELETE FROM students_new WHERE email = ?`,
      [req.body.email],
      (err, results) => {
        if (results) {
          //console.log(results);
          return res.json(results);
        }
        //else if (err) res.json(err);
      }
    );
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

const getClass = (req, res, next) => {
  db.query(
    `SELECT * FROM students_new WHERE email = ?`,
    [req.email],
    (err, result) => {
      req.class = result[0].class;
      next();
    }
  );
};
app.post("/raise-doubt", verifyToken, getClass, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `INSERT INTO doubt VALUES('${req.body.doubt}', '${req.email}', '${req.class}')`,
      (err, results) => {
        if (results) {
          return res.json("Success");
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
app.post("/create-assignment", verifyToken, getClass, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `INSERT INTO assignment VALUES('${req.body.name}', '${req.body.email}', '${req.class}')`,
      (err, results) => {
        if (results) {
          return res.json("Success");
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

app.post("/create-test", verifyToken, getClass, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `INSERT INTO test VALUES('${req.body.name}', '${req.body.email}', '${req.class}')`,
      (err, results) => {
        if (results) {
          return res.json("Success");
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

app.get("/get-assignments", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(`SELECT * FROM assignment`, (err, results) => {
      if (results) {
        console.log(results);
        return res.json(results);
      } else {
        return res.json(err);
      }
      //else if (err) res.json(err);
    });
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

app.get("/get-test", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(`SELECT * FROM test`, (err, results) => {
      if (results) {
        console.log(results);
        return res.json(results);
      } else {
        return res.json(err);
      }
      //else if (err) res.json(err);
    });
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete-assignment", verifyToken, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    console.log(req.body.email);
    db.query(
      `DELETE FROM assignment WHERE due = ?`,
      [req.body.due],
      (err, results) => {
        if (results) {
          //console.log(results);
          console.log(results);
          return res.json(results);
        }
        //else if (err) res.json(err);
      }
    );
    //res.send("Created the user");
  } catch (err) {
    console.log(err);
  }
});

app.get("/get-my-assignment", verifyToken, getClass, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `SELECT * FROM assignment WHERE class = ?`,
      [req.class],
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

app.get("/get-my-doubt", verifyToken, getClass, (req, res) => {
  //console.log(req.body);
  //const { name, password, email } = req.body;
  //console.log(pass);
  try {
    db.query(
      `SELECT * FROM doubt WHERE subject = ?`,
      [req.class],
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
