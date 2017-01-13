var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer_api');

module.exports = mongoose;
