var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'public/uploads')
	},
	filename: function(req,file,cb){
		var fileFormat = (file.originalname).split(".");
		cb(null,req.body.name + "." + fileFormat[fileFormat.length - 1]);
	}
});

var upload = multer({
	storage: storage
})

var UserModel = require('../models/users');

router.get('/', function(req,res,next) {
	res.render('signup',{
		title: "去你吗的"
	});
})

router.post('/', upload.single('avatar'), function(req,res,next) {
	var name = req.body.name,
		password = req.body.password;
	

	if(!req.file || !name || !password){
		console.log('你麻痹不输入提交你麻痹');
		return res.redirect('back');
	}
	var avatar = req.file.filename.replace('.' + req.file.filename.split('.').pop(),"");
	console.log(req.file);
	console.log(req.body);
	console.log(avatar);
	var user = {
		name: name,
		password: password,
		avatar: avatar
	}

	UserModel.create(user)
	.then(function(user) {
		if(!user){
			console.log("错啦");
			return res.redirect('back');
		}

		console.log("对啦");

		req.session.user = user;

		res.render('index',{
			title: "你妈隔壁",
			user:req.session.user
		});
	})
	.catch(function(err){
		console.log('你麻痹错了');
		return res.redirect('back')
	})

	
	// var name = req.fields.name;
	// console.log(name);
})

module.exports = router;