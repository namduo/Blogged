var mongoose = require('mongoose');
require('mongoose-type-email');

var bcrypt = require('bcrypt');


// Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Blogged')
var db = mongoose.connect();


var UserSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConf: {
		type: String,
		required: true
	}
});

// Hash Password
UserSchema.pre('save', function(next) {

	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {

		if (err) {
			return next(err);
		}
		user.password = hash;
		user.passwordConf = hash;
		next();
	});

});

// Authenticate

UserSchema.statics.authenticate = function(username, password, callback) {

	User.findOne({ userName: username})
	.exec(function(err, user) {

		if (err) {
			return callback(err);
		}

		// Error for no userID
		else if (!user) {
			var err = new Error('No user found');
			err.status = 401;
			return callback('err');
		}

		// Compare password
		bcrypt.compare(password, user.password, function(err, result) {

			if (result === true) {
				return callback(null, user);
			} else {

				// Passwords didn't match
				var err = new Error('Passwords do not match');
				err.status = 401;
				return callback();
			}
		});
	});
}

var User = mongoose.model("User", UserSchema);

module.exports = User;
