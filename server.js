var express = require('express');
var mongoose = require('./app/db/connection');
var bodyParser = require('body-parser');
var Beer = require('./app/models/beer');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
app.use('/api', router);

router.route('/beers')
  .get((req, res, next) => {
    Beer.find()
      .then((beers) => {
        res.json(beers);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .post((req, res, next) => {
    Beer.create(req.body.beer)
      .then((beer) => {
        res.json(beer);
      })
      .catch((err) => {
        console.error(err);
      });
  });

router.route('/beers/:id')
  .get((req, res, next) => {
    Beer.findById(req.params.id)
      .then((beer) => {
        res.json(beer);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .put((req, res, next) => {
    Beer.findByIdAndUpdate(req.params.id, req.body.beer)
      .then((beer) => {
        res.json(beer);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .delete((req, res, next) => {
    Beer.findByIdAndRemove(req.params.id, req.body.beer)
      .then((beer) => {
        res.redirect('/api/beers');
      })
      .catch((err) => {
        console.error(err);
      });
  });

app.listen(process.env.PORT || 3000);
