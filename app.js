var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:a@localhost:5432/blog');

// this is to serve the css and js from the public folder to your app
// it's a little magical, but essentially you put files in there and link
// to them in you head of your files with css/styles.css
app.use(express.static(__dirname + '/public'));

// this is setting the template engine to use ejs
app.set('view engine', 'ejs');

// setting your view folder
app.set('views', __dirname+'/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for your routes to know where to know if there is param _method DELETE
// it will change the req.method to DELETE and know where to go by setting
// your req.url path to the regular path without the parameters
app.use( function( req, res, next ) {
  if (req.query._method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

// gettting all the blogs
app.get('/', function(req, res, next){
  db.any('SELECT * FROM blogs')
    .then(function(data){
      return res.render('index', {blogs: data})
    })
    .catch(function(err){
      return next(err);
    });
});

//add new blog
app.get('/blogs/new', function(req, res, next){
  res.render('new');
});

app.post('/blogs/new', function(req, res, next){
  db.none('insert into blogs(title, blogdate, entry)' +
     'values(${title}, ${blogdate}, ${entry})',
   req.body)
   .then(function () {
     res.redirect('/');
   })
   .catch(function (err) {
     return next(err);
   });
});

// edit blogs
app.get('/blogs/:id/edit', function(req, res, next){
  var id = parseInt(req.params.id);
  db.one('select * from blogs where id = $1', id)
    .then(function (blog) {
      res.render('edit', {blog: blog})
    })
    .catch(function (err) {
      return next(err);
    });
});

app.post('/blogs/:id/edit', function(req, res, next){
  db.none('update blogs set title=$1, blogdate=$2, entry=$3 where id=$4',
    [req.body.title, req.body.blogdate, req.body.entry, parseInt(req.params.id)])
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

//show blog
app.get('/blogs/:id/', function(req, res, next){
  var id = parseInt(req.params.id);
  db.one('select * from blogs where id = $1', id)
    .then(function (blog) {
      res.render('show', {blog: blog})
    })
    .catch(function (err) {
      return next(err);
    });
});

//delete blogs
app.delete('/blogs/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  db.result('delete from blogs where id = $1', id)
    .then(function (result) {
      res.redirect('/');
    })
    .catch(function (err) {
      return next(err);
    });
});

app.listen(3000, function(){
  console.log('Application running on localhost on port 3000');
});
