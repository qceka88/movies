let server;

setup(function() {
  let movies = [
    {"name" : "Interstellar", "rating" : "9.8"},
    {"name" : "Shrek", "rating" : "9.1"},
    {"name" : "The Mummy", "rating" : "9.3"}
  ];
  const express = require('express');
  const app = express();
  server = require('http').createServer(app);
  app.set('view engine', 'pug');
  app.use(require('body-parser')
    .urlencoded({extended:true}));
  const moviesController = 
    require("../../controllers/movies-controller");
  moviesController.setup(app, movies);
  server.listen(8888);
});

teardown(function() {
  server.close();
});
