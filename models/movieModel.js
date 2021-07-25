const pool = require("../config/db");

exports.selectAll = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT mv.name as name, mv.release_date as release_date, mv.release_month as release_month, mv.release_year as release_year, mv.duration_min as duration_min, mv.genre as genre, mv.description as description, st.status as status, lc.location as location, tm.time as time FROM schedules AS sc INNER JOIN locations AS lc ON sc.location_id=lc.id INNER JOIN show_times AS tm ON sc.time_id = tm.id RIGHT JOIN movies AS mv ON sc.movie_id = mv.id LEFT JOIN movie_status as st ON mv.status = st.id`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};

exports.selectByStatus = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT mv.name as name, mv.release_date as release_date, mv.release_month as release_month, mv.release_year as release_year, mv.duration_min as duration_min, mv.genre as genre, mv.description as description, st.status as status, lc.location as location, tm.time as time FROM schedules AS sc INNER JOIN locations AS lc ON sc.location_id=lc.id INNER JOIN show_times AS tm ON sc.time_id = tm.id RIGHT JOIN movies AS mv ON sc.movie_id = mv.id LEFT JOIN movie_status as st ON mv.status = st.id WHERE LOWER(st.status)=LOWER('${data.status}')`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};

exports.selectByLocation = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT mv.name as name, mv.release_date as release_date, mv.release_month as release_month, mv.release_year as release_year, mv.duration_min as duration_min, mv.genre as genre, mv.description as description, st.status as status, lc.location as location, tm.time as time FROM schedules AS sc INNER JOIN locations AS lc ON sc.location_id=lc.id INNER JOIN show_times AS tm ON sc.time_id = tm.id RIGHT JOIN movies AS mv ON sc.movie_id = mv.id LEFT JOIN movie_status as st ON mv.status = st.id WHERE LOWER(location)=LOWER('${data.location}')`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};

exports.selectByTime = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT mv.name as name, mv.release_date as release_date, mv.release_month as release_month, mv.release_year as release_year, mv.duration_min as duration_min, mv.genre as genre, mv.description as description, st.status as status, lc.location as location, tm.time as time FROM schedules AS sc INNER JOIN locations AS lc ON sc.location_id=lc.id INNER JOIN show_times AS tm ON sc.time_id = tm.id RIGHT JOIN movies AS mv ON sc.movie_id = mv.id LEFT JOIN movie_status as st ON mv.status = st.id WHERE LOWER(time)=LOWER('${data.time}')`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};

exports.selectByStatusLocationTime = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT mv.name as name, mv.release_date as release_date, mv.release_month as release_month, mv.release_year as release_year, mv.duration_min as duration_min, mv.genre as genre, mv.description as description, st.status as status, lc.location as location, tm.time as time FROM schedules AS sc INNER JOIN locations AS lc ON sc.location_id=lc.id INNER JOIN show_times AS tm ON sc.time_id = tm.id RIGHT JOIN movies AS mv ON sc.movie_id = mv.id LEFT JOIN movie_status as st ON mv.status = st.id WHERE LOWER(st.status)=LOWER('${data.status}') AND LOWER(location)=LOWER('${data.location}') AND LOWER(time)=LOWER('${data.time}')`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};

exports.insert = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO movies(name,genre,release_date,release_month,release_year,duration_min,description,status) VALUES('${data.name}','${data.genre}',${data.release_date},${data.release_month},${data.release_year},${data.duration_min},'${data.description}', 1) `;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.update = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE movies SET status='${data.status}' WHERE id='${data.id}'`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.addSchedule = (data) => {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO schedules(movie_id,location_id,time_id) VALUES(${data.movie_id},${data.location_id},${data.time_id})`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};