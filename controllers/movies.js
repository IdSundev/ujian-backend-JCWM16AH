const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const jwt = require("../lib/jwt");

exports.all = async (req, res) => {
  let selectAll = Movie.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};

exports.filter = async (req, res) => {
  if (req.query.location === undefined && req.query.time === undefined) {
    let data = {
      status: req.query.status,
    };
    let selectByFilter = Movie.selectByStatus(data);
    selectByFilter
      .then((result) => {
        if (result.length === 0) {
          res.json({
            status: "Error",
            message: "Tidak ada Data!",
          });
          return;
        }
        res.json(result);
        return;
      })
      .catch((err) => {
        res.json({
          status: "Error",
          message: "Tidak ada Data!",
        });
        return;
      });
    return;
  }
  if (req.query.status === undefined && req.query.time === undefined) {
    let data = {
      location: req.query.location,
    };
    let selectByFilter = Movie.selectByLocation(data);
    selectByFilter
      .then((result) => {
        if (result.length === 0) {
          res.json({
            status: "Error",
            message: "Tidak ada Data!",
          });
          return;
        }
        res.json(result);
        return;
      })
      .catch((err) => {
        res.json({
          status: "Error",
          message: "Tidak ada Data!",
        });
        return;
      });
    return;
  }
  if (req.query.status === undefined && req.query.location === undefined) {
    let data = {
      time: req.query.time,
    };
    let selectByFilter = Movie.selectByTime(data);
    selectByFilter
      .then((result) => {
        if (result.length === 0) {
          res.json({
            status: "Error",
            message: "Tidak ada Data!",
          });
          return;
        }
        res.json(result);
        return;
      })
      .catch((err) => {
        res.json({
          status: "Error",
          message: "Tidak ada Data!",
        });
        return;
      });
    return;
  }
  let data = {
    status: req.query.status,
    location: req.query.location,
    time: req.query.time,
  };
  let selectByFilter = Movie.selectByStatusLocationTime(data);
  selectByFilter
    .then((result) => {
      if (result.length === 0) {
        res.json({
          status: "Error",
          message: "Tidak ada Data!",
        });
        return;
      }
      res.json(result);
      return;
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Tidak ada Data!",
      });
      return;
    });
};

exports.add = async (req, res) => {
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
    name: req.body.name,
    genre: req.body.genre,
    release_date: req.body.release_date,
    release_month: req.body.release_month,
    release_year: req.body.release_year,
    duration_min: req.body.duration_min,
    description: req.body.description,
    uid: uid,
  };

  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        let user_role = jwt.Decode(req.body.token).role;
        if (user_role !== 1) {
          res.json({
            status: "Error",
            message:
              "Hanya ADMIN yang dapat mengakses fitur ini. pada saat register, user akan memiliki role 'USER' bukan 'ADMIN', gunakan user admin untuk akses fitur ini! (username:cefsyarif, password:@Cefsyarif294)",
          });
          return;
        }
        let addMovie = Movie.insert(data);
        addMovie.then((result) => {
          res.json({
            id: result.insertId,
            name: req.body.name,
            genre: req.body.genre,
            release_date: req.body.release_date,
            release_month: req.body.release_month,
            release_year: req.body.release_year,
            duration_min: req.body.duration_min,
            description: req.body.description,
          });
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui, harap login terlebih dahulu!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui, harap login terlebih dahulu!!",
      });
      return;
    });
};

exports.edit = async (req, res) => {
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
    id: req.params.id,
    status: req.body.status,
    uid:uid,
  };
  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        let user_role = jwt.Decode(req.body.token).role;
        if (user_role !== 1) {
          res.json({
            status: "Error",
            message:
              "Hanya ADMIN yang dapat mengakses fitur ini. pada saat register, user akan memiliki role 'USER' bukan 'ADMIN', gunakan user admin untuk akses fitur ini! (username:cefsyarif, password:@Cefsyarif294)",
          });
          return;
        }
        let editMovie = Movie.update(data);
        editMovie.then((result) => {
          res.json({
            id: req.params.id,
            message: 'status has been changed.'
          });
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui, harap login terlebih dahulu!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui, harap login terlebih dahulu!!",
      });
      return;
    });
};

exports.addSchedule = async (req, res) => {
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
    movie_id: req.params.id,
    location_id: req.body.location_id,
    time_id: req.body.time_id,
    uid: uid,
  };
  let selectOne = User.selectOne(data);
  selectOne
    .then((result) => {
      if (result.length > 0) {
        let user_role = jwt.Decode(req.body.token).role;
        if (user_role !== 1) {
          res.json({
            status: "Error",
            message:
              "Hanya ADMIN yang dapat mengakses fitur ini. pada saat register, user akan memiliki role 'USER' bukan 'ADMIN', gunakan user admin untuk akses fitur ini! (username:cefsyarif, password:@Cefsyarif294)",
          });
          return;
        }
        let addScheduleMovie = Movie.addSchedule(data);
        addScheduleMovie.then((result) => {
          res.json({
            id: req.params.id,
            message: 'schedule has been added.'
          });
        });
        return;
      } else {
        res.json({
          status: "Error",
          message: "Token tidak diketahui, harap login terlebih dahulu!",
        });
        return;
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Token tidak diketahui, harap login terlebih dahulu!!",
      });
      return;
    });
}
