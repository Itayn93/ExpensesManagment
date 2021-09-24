var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const User = require('../models/user');
const UserChanges = require('../models/userschanges');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const userInfo = await getCurrentUserInfo("204701668"); // only if there is data here - if login works then this will work anyway
  let birthday = await formatDate(userInfo._doc.Birthday);
  res.render('userProfile', { title: 'Here Is Your User Profile:' , userInfo,birthday});
});

router.post('/',  async function(req, res, next) {
  const userInfo = await getCurrentUserInfo("204701668");
  //await updateUserInfo(req,userInfo);
  const updatedUserInfo = new UserChanges({
    _id:new mongoose.Types.ObjectId(),
    Fullname:req.body.fullName,
    Username: req.body.userName,
    Password: req.body.password,
    UserId: req.body.userId,
    Birthday: req.body.birthday,
    Maritalstatus: req.body.maritalStatus,
    Revision: userInfo.Revision + 1
  });
  updatedUserInfo.save().then(result => {
    console.log(result);
  }).catch(err => console.log(err));
  await User.deleteOne({UserId: userInfo.UserId} );
  await User.insertMany(updatedUserInfo); // insertOne not recognized
  res.status(201).redirect('../../');
});

module.exports = router;


async function getCurrentUserInfo(userId){
  //let userInfo = await UserChanges.find({Id:userId}).sort({"Revision": -1 }).limit(1); // get updated (at least once) info
  //if (userInfo.length === 0) {
  const userInfo = await User.findOne({Id:userId});
    if (userInfo) {
      console.log(`Found user info from users with id: '${userId}'`);
    } else {
      console.log(`No user found with id:'${userId}'`);
    }
  // } else{
  //   userInfo = userInfo[0];
  //   console.log(`Found user info from userschanges with id: '${userId}'`);
  // }

  //console.log(userInfo);
  return userInfo;
}

// async function updateUserInfo(req,userInfo){
//   const updatedUserInfo = new UserChanges({
//     _id:new mongoose.Types.ObjectId(),
//     Fullname:req.body.fullName,
//     Username: req.body.userName,
//     Password: req.body.password,
//     UserId: req.body.userId,
//     Birthday: req.body.birthday,
//     Maritalstatus: req.body.maritalStatus,
//     Revision: userInfo.Revision + 1
//   });
//   updatedUserInfo.save().then(result => {
//     console.log(result);
//   }).catch(err => console.log(err));
//   //await User.updateOne({UserId: userInfo.UserId}, {$set:userInfo})
//
//
//   //res.render('expenseAddNew', { title: 'Expenses List: '});
//
// }

async function formatDate(date){
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = date.getFullYear();
  date = yyyy + '-' + mm + '-' + dd;
  return date;
}