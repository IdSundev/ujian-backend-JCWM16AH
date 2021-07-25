const User = require("../models/userModel");
const platform = require("../platform");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

exports.register = async (req, res) => {
  if (req.body.username.length < 6) {
    res.json({
      status: "Error",
      message: "Username minimal 6 huruf!",
    });
    return;
  }
  let validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!req.body.email.match(validEmail)) {
    res.json({
      status: "Error",
      message: "Email tidak valid!",
    });
    return;
  }
  let validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  if (!req.body.password.match(validPassword)) {
    res.json({
      status: "Error",
      message: "Password minimal 6 huruf, mengandung angka & spesial karakter!",
    });
    return;
  }
  let uid = Date.now().toString().substring(5, 13);
  let token = jwt.Encode({
    uid: uid,
    role: 2,
  });
  let data = await {
    uid,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.Encrypt(req.body.password),
  };
  let result = User.insert(data);
  result
    .then(function (result) {
      res.json({
        id: result.insertId,
        uid: uid,
        username: req.body.username,
        email: req.body.email,
        token: token,
      });
    })
    .catch(function (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.json({
          status: 500,
          message:
            "Email telah digunakan, gunakan email lain untuk registrasi!",
        });
      }
    });
};

exports.login = async (req, res) => {
  let data = {
    user: req.body.user,
    password: bcrypt.Encrypt(req.body.password),
  };
  let user = User.login(data);
  user
    .then(function (result) {
      if (result.length > 0) {
        if (result[0].status == 2) {
          res.json({
            status: "Error",
            message: "User tidak dapat login karena DEACTIVE!",
          });
          return;
        }
        if (result[0].status == 3) {
          res.json({
            status: "Error",
            message: "Akun sudah ditutup!",
          });
          return;
        }
        let token = jwt.Encode({
          uid: result[0].uid,
          role: result[0].role,
        });
        res.json({
          id: result[0].id,
          uid: result[0].uid,
          username: result[0].username,
          email: result[0].email,
          status: result[0].status,
          role: result[0].role,
          token: token,
        });
        // Set cookies

        return;
      } else {
        res.json({
          status: "Error",
          message: "username/email dan atau password salah!",
        });
        return;
      }
    })
    .catch(function (err) {
      res.json({
        status: "Error",
        message: "username/email dan atau password salah!",
      });
      return;
    });
};

exports.deactive = async (req, res) => {
  let uid
  try{
    uid = jwt.Decode(req.body.token).uid
  }
  catch(err){
    res.json({
      status: "Error",
      message: "Token tidak diketahui"
    })
    return;
  }
  let data = {
    uid: uid,
  };
  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        if (result[0].status == 3) {
          res.json({
            status: "Error",
            message: "Akun sudah ditutup!",
          });
          return;
        }
        User.deactive(data);
        res.json({
          uid: jwt.Decode(req.body.token).uid,
          status: "deactive",
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui!!",
      });
      return;
    });
};

exports.active = async (req, res) => {
  let uid
  try{
    uid = jwt.Decode(req.body.token).uid
  }
  catch(err){
    res.json({
      status: "Error",
      message: "Token tidak diketahui"
    })
    return;
  }
  let data = {
    uid: uid,
  };
  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        if (result[0].status == 3) {
          res.json({
            status: "Error",
            message: "Akun sudah ditutup!",
          });
          return;
        }
        if (result[0].status == 1) {
          res.json({
            status: "Error",
            message: "Hanya akun dengan status deactive yang bisa diaktifkan kembali!",
          });
          return;
        }
        User.active(data);
        res.json({
          uid: jwt.Decode(req.body.token).uid,
          status: "active",
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui!!",
      });
      return;
    });
};

exports.close = async (req, res) => {
  let uid
  try{
    uid = jwt.Decode(req.body.token).uid
  }
  catch(err){
    res.json({
      status: "Error",
      message: "Token tidak diketahui"
    })
    return;
  }
  let data = {
    uid: uid,
  };
  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        User.close(data);
        res.json({
          uid: jwt.Decode(req.body.token).uid,
          status: "closed",
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui!!",
      });
      return;
    });
};
