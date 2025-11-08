let user_controller = {

	// user object, register/login mode
	function validate_user_info(user, mode) {
		if (mode == 'login') {
			for (let u in users) {
				if (user.name == u.name && hash(user.password) == u.password)
					return u
			}
			return false
		} else if (mode == 'register') {
			if (u.password.length < 8 
				|| !!(new Date(u.date_of_birth) 
				|| !u.first_name 
				|| !u.last_name 
				|| !u.email))
				return false
			return u
		} else {
			pr('No such validation mode.')
		}
	}

	register = async function(req, res) {
		try {
			let user = validate_users_info(req.body, 'register')
			
		} catch(e) {

		}

	}

	login = async function(req, res) {
		try {
			let user = validate_user_info(req.body, 'login')
		} catch(e) {
			res.status(500).send('Something went wrong')
		}
	}
}

module.exports = user_controller