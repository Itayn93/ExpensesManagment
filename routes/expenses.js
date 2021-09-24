var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var db = mongoose.connection;
const expense = require('../models/expense');
dbName = "projectDB";


/* GET home page. */
router.get('/addExpense',  async function(req, res, next) {
    res.render('expenseAddNew', { title: 'Please Add New Expense: '});

});

router.get('/',  async function(req, res, next) {
    res.render('expensesList', { title: 'Expenses List: ' , Data: null});

});

router.post('/addExpense',  async function(req, res, next) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const newExpense = new expense({
        _id:new mongoose.Types.ObjectId(),
        UserId:"204701668", /*TODO: userId from Logged in user */
        Date: today,
        Category: req.body.Category,
        Description: req.body.Description,
        Sum: req.body.Sum
    });
    newExpense.save().then(result => {
        //console.log(result);
    }).catch(err => console.log(err));
    res.status(201).redirect('../../');
    //res.render('expenseAddNew', { title: 'Expenses List: '});

});


router.post('/',  async function(req, res, next) {
    let month = req.body.month;
    let year = req.body.year;
    let expenses = await getMonthlyReport("204701668",month,year);
    res.render('expensesList', { title: 'Expenses List: ' , Data: expenses ,Month: month,Year: year});

});



module.exports = router;






async function getMonthlyReport(userId,month,year){
    let firstDayOfMonth;
    let lastDayOfMonth;
    let expenses;

    if(month <=9){
        firstDayOfMonth = year + '-0' + month + '-' + '01';
        lastDayOfMonth = year + '-0' + month + '-' + '31';
    } else{
        firstDayOfMonth = year + '-' + month + '-' + '01';
        lastDayOfMonth = year + '-' + month + '-' + '31';
    }
    try{
        expenses = await expense.find({Date: {$gte: firstDayOfMonth, $lte: lastDayOfMonth}}).sort({Date: 1});
    }catch (err){
        console.log(err);
    }
    return expenses;
}