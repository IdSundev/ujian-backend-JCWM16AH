const pool = require("../config/db");

exports.insert = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `insert into users(uid,username,email,password,role,status) values(${data.uid},'${data.username}','${data.email}','${data.password}',1,1)`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.login = (data) => {
  return new Promise(function (resolve, reject) {
    var sql = `SELECT * FROM users WHERE (username='${data.user}' OR email='${data.user}') AND password='${data.password}'`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.deactive = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE users SET status=2 WHERE uid='${data.uid}'`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.active = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE users SET status=1 WHERE uid='${data.uid}'`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.close = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE users SET status=3 WHERE uid='${data.uid}'`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
};

exports.selectOne = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT * FROM users WHERE uid='${data.uid}'`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};
