const { signUpToEvent } = require('./churchsuite-api-client');

exports.signUp = function signUp(eventId, data) {
	signUpToEvent(eventId, data);
};
