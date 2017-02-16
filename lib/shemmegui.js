var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(callback){
	console.log("caonima");
});

// var kittySchema = mongoose.Schema({
// 	name:String,
// 	age:Number
// });

// kittySchema.methods.speak = function(){
// 	var greeting = this.name
// 		? "Meow name is " + this.name
// 		: "I don't have a name"
// 	console.log(greeting)
// };
// var Kitten = mongoose.model('Kitten',kittySchema);

// var fluffy = new Kitten({ name: "push",age:5});

// fluffy.speak();

// // fluffy.save(function(err,fluffy){
// // 	if(err) return console.error(err);
// // 	fluffy.speak();
// // })

// Kitten.find(function(err,kittens){
// 	if(err) return console.error(err);
// 	console.log(kittens);
// })

// Kitten.find({name:/^push/},function(err,kittens){
// 	if(err) return console.err(err);
// 	console.log(kittens)
// });

var Schema = mongoose.Schema;

var personSchema = new Schema({
	name: {
		first: String,
		last: String
	}
});

var Person = mongoose.model('Person', personSchema);

var bad = new Person({
	name: { first: 'Walter', last: 'White'}
});

personSchema.virtual('name.full').get(function (){
	return this.name.first + " " + this.name.last;
});

console.log('&s is insane', bad.name.full);

personSchema.virtual('name.full').set(function (name){
	var split = name.split(' ');
	this.name.first = split[0];
	this.name.last = split[1];
});

bad.name.full = 'Breaking Bad';

console.log(bad.name.first);
console.log(bad.name.last);