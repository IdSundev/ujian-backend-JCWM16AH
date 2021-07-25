const express = require("express");
const router = express.Router();

const ctrlUsers = require("../controllers/users");
const ctrlMovies = require("../controllers/movies");

router.post('/user/register', ctrlUsers.register);
router.post('/user/login', ctrlUsers.login);
router.patch('/user/deactive', ctrlUsers.deactive);
router.patch('/user/activate', ctrlUsers.active);
router.patch('/user/close', ctrlUsers.close);

router.get('/movies/get/all', ctrlMovies.all);
router.get('/movies/get', ctrlMovies.filter);
router.post('/movies/add', ctrlMovies.add);
router.patch('/movies/edit/:id', ctrlMovies.edit);
router.patch('/movies/set/:id', ctrlMovies.addSchedule);

module.exports = router;

