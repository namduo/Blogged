var mongoose = require('mongoose');
require('mongoose-type-email');

var bcrypt = require('bcrypt');

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
			callback(err);
		}	else if (!user) {
			var err = new Error('No user found');
			err.status = 401;
			callback(err);
		}

		// Compare password
		bcrypt.compare(password, user.password, function(err, result) {
			if (result === true) {
				callback(null, user);
			} else {
				callback({});
			}
		});
	});
}

var User = mongoose.model("User", UserSchema);

module.exports = User;
