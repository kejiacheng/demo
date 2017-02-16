var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fucker');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	password: String,
	avatar: String
});



var User = mongoose.model('User',UserSchema);

User.find({}).sort({'password':-1}).exec()
.then(function(result) {
	console.log(result);
})

exports.User = User;

var PostSchema = new Schema({
	author: String,
	title: String,
	content: String,
	pv: String
});

var Post = mongoose.model('Post',PostSchema);

exports.Post = Post;