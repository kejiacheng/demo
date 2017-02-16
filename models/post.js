var marked = require('marked');
var Post = require('../lib/mongo').Post;

// Post.plugin('contentToHtml', {
// 	afterFing: function(posts) {
// 		return posts.map(function (post) {
// 			post.content = marked(post.content);
// 			return post;
// 		});
// 	},
// 	afterFindOne: function (post) {
// 		if (post) {
// 			post.content = marked(post.content);
// 		}
// 		return post;
// 	}
// });

module.exports = {
	create: function create(post){
		var post = new Post({
			author: post.author,
			title: post.title,
			content: post.content,
			pv: post.pv
		});

		return post.save();
		// title = post._id;
		// return Post
		// .findOne({title: post._id})
		// .exec()
	},
	getPostById: function getPostById(postId) {
		return Post
		.findOne({_id:postId})
		.exec();
	}
}