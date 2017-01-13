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
      console.log()
      res.json(beer);
    })
    .catch((err) => {
      console.error(err);
    });
  });

var port = process.env.PORT || 8080;
app.listen(port);
