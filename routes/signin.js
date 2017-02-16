var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req,res,next) {
	res.render('signin',{
		title: "去你吗的"
	});
})

router.post('/', checkNotLogin, function(req,res,next) {
	var name = req.body.name,
		password = req.body.password;

	UserModel.getUserByName(name)
	.then(function (user){
		if(!user){
			console.log("nimabi");
			return res.redirect('back');
		}

		if(password !== user.password){
			console.log("caonima");
			return res.redirect('back');
		}
		console.log(user.password);
		user.password = null;
		console.log(user.password);

		req.session.user = user;
		console.log(req.session.user);
		res.redirect('/post?name=sb');
	})
})

// router.get('',function(req,res,next) {

// })

module.exports = router;