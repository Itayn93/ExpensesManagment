var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  //const result = db.collection("costs").insertOne(newCost);
  //console.log('New cost created with id:'); //${result.InsertedId}');
  /** TODO: if logged in: */
  res.render('index', { title: 'Welcome To Expense Manager' });
  // else
  //res.status(302).redirect('/login');
});


module.exports = router;
