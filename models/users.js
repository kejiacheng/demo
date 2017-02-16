var User = require('../lib/mongo').User;

module.exports = {
	create: function create(user){
		var user = new User({
			name: user.name,
			password: user.password,
			avatar: user.avatar
		});
		return user.save();
	},
	getUserByName: function getUsertByname(name){
		return User
		.findOne({name:name})
	}
};

