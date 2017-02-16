var express = require('express');
var router = express.Router();

var PostModel = require('../models/post.js');

router.get('/',function(req,res,next) {
	res.render('post',{
		title: req.query.name,
		content: null
	});
})

router.post('/',function(req,res,next) {
	var title = req.body.title,
		content = req.body.content,
		author = req.session.user._id;
		console.log(author)
	var post = {
		author: author,
		title: title,
		content: content,
		pv: 0
	};
	PostModel.create(post)
	.then(function (result) {
		res.redirect(`/post/${result._id}`);
	})

		
	
})

router.get('/:postId', function(req,res,next) {
	var postId = req.params.postId;

	Promise.all([
		PostModel.getPostById(postId)
	])
	.then(function (result) {
		console.log(result);
		console.log(result[0].content);
		res.render('post',{
			title: req.query.name,
			content: result[0].content
		})
	})
})
module.exports = router;