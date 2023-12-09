function setup(app, movies) {
  app.get('/', function(req, res) {
    let model = {
      title: "My Movie Colletion",
      msg: "Movies Collection",
      movies: movies
    };
    res.render('home', model);
  });
  
  app.get('/loaderio-97355a48d08652424ffe033c5cf3d460.txt', function(req, res) {
    res.send('loaderio-97355a48d08652424ffe033c5cf3d460');
  });

  app.get('/movies', function(req, res) {
    let model = {title: "Movies", movies};
    res.render('movies', model);
  });

  app.get('/about', function(req, res) {
    let model = {title: "About"};
    res.render('about', model);
  });

  app.get('/add-movie', function(req, res) {
    let model = {title: "Add Movie"};
    res.render('add-movie', model);
  });

  function paramEmpty(p) {
    if (typeof(p) != 'string')
      return true;
    if (p.trim().length == 0)
      return true;
    return false;
  }

  app.post('/add-movie', function(req, res) {
    if (paramEmpty(req.body.name) || paramEmpty(req.body.rating) ) {
      let model = {
        title: "Add Movie", 
        errMsg: "Cannot add movie. Name and rating fields are required!"
      };
      res.render('add-movie', model);
      return;
    }
    let movie = {
      name: req.body.name,
      rating: req.body.rating
    };
    movies.push(movie);
    res.redirect('/movies');
  });
}

module.exports = { setup };
