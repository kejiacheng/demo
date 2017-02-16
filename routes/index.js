module.exports = function(app){
	app.get('/',function(req,res){
		var user = req.session.user;
		console.log(user);
		res.render('index',{
			title:'node 学习路...',
			user: user
		});
	})

	app.use('/signin',require('./signin'));
	app.use('/signup',require('./signup'));
	app.use('/post',require('./post'));
	app.use('/signout',require('./signout'));
}