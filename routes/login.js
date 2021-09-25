var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
   // console.log('Login.js router.get');
    res.render('login', { title: 'Welcome To Expense Manager' });

});

router.post('/', async function(req, res, next) {

    const currentUser = await User.findOne({Username:req.body.userName,Password:req.body.password});
    if(currentUser){
        res.redirect('index');
        //res.render('index', { title: 'Welcome To Expense Manager' });
    } else{
        res.render('error', { message: 'No Such User In DB !' });
    }
        // .exec()
        // .then(doc => {
        //     console.log(doc);
        //     if (doc)
        //         res.redirect('../');
        //     else
        //         res.status(200).json({
        //             message:"Username or Password is incorrect",
        //             user:req.body.inputUsername,
        //             password:req.body.inputPassword
        //         });
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json({error: err});
        // });
});
module.exports = router;