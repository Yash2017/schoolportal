const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const db = require("./database");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/temp");
  },
  filename: (req, file, cb) => {
    req.originalname = file.originalname;
    // db.query(
    //   `INSERT INTO submitted_assignment VALUES('${req.email}', '${file.originalname}', '${req.class}', '${req.body.name}')`,
    //   (err, results) => {
    //     if (results) {
    //       // return res.json("Success");
    //     } else {
    //       // return res.json(err);
    //     }
    //     //else if (err) res.json(err);
    //   }
    // );
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
  dest: __dirname + "/temp",
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
