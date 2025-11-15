

// user object, register/login mode
function validate_user_info(user, mode) {
	if (mode == 'login') {
		let err = 'Username or password are incorrect.'
		for (let u in users) {
			if (user.name == u.name && hash(user.password) == u.password)
				return [0, u]
		}
		return [1, err]
	} else if (mode == 'register') {
		if (u.password.length < 8 
			|| !!(new Date(u.date_of_birth))
			|| !u.first_name 
			|| !u.last_name 
			|| !u.email
			)
			return [1, 'Some data is not in the correct format.']
		return [0, u]
	} else {
		pr('No such validation mode.')
	}
}

function generate_user_cookie(user) {
	let cookie = encodeURIComponent(hash(user.username)+'|||'+user.id+'|||'+generate_session(user.id))
	return cookie
}

let user_controller = {
	register: async function(req, res) {
		try {
			let [exit_code, user] = validate_users_info(req.body, 'register')
			if (!exit_code)
				res.status(400).send(user)
			user = add_user(user)
			res.setHeader('Set-Cookie', 'auth: ' + generate_user_cookie(user) + ';Max-Age: 36000000')
			res.status(200).send('')
		} catch(e) {

		}

	},
	login: async function(req, res) {
		try {
			// If returning 1 (the user data is incorrect), user becomes error message
			let [exit_code, user] = validate_user_info(req.body, 'login')
			if (!exit_code)
				res.status(400).send(user)
			res.setHeader('Set-Cookie', 'auth: ' + generate_user_cookie(user) + ';Max-Age: 36000000')
			res.status(200).send('')
		} catch(e) {
			res.status(500).send('Something went wrong')
		}
	},
	register_to_team: async function(req, res) {

	}
}

module.exports = user_controller
