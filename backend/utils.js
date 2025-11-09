let fs     = require('fs')
let crypto = require('crypto')
let path   = require('path')

pr = console.error

// Crypto utils

hash = async function(s) {
	return await crypto.createHash('sha256').update(s).update(SERVER_SECRET).digest('hex')
}

generate_session = function(user_id) {
	let user = users[user_id]
	user.session = crypto.randomBytes(64).toString('hex')
	save_user(user.id)
	return user.session
}

// Mock DB

get_users = function() {
	users = {}
	for (let file of read_dir('users')) {
		users[path.win32.basename(file, '.json')] = JSON.parse(file)
	}
}

add_user = function(user) {
	user.id = next_id('user')
	mkdir(db_path('users') + '/' + user.id + '.json', JSON.stringify(user))
	return user
}

save_user = function(user_id) {
	write_file(user_path(user_id), JSON.stringify(users[user_id]))
}


// Fs utils

function db_path(dir) {
	return path.normalize(process.cwd() + '/var/' + dir)
}

file_exists = function(path) {
	return !!fs.statSync(path, {throwIfNoEntry: false})
}

write_file = function(file, data) {
	return fs.writeFileSync(file, data)
}

read_file = function(path) {
	return fs.readFileSync(path)
}

mkdir = function(path) {
	fs.mkdir(path, {recursive: true})
}

read_dir = function(dir) {
	return fs.readdirSync(db_path(dir))
}

user_path = function(user_id) {
	return db_path('users') + '/' + user_id + '.json'
}

// Number utils
// Type -> user, team, hunt
next_id = function(type) {
	if (file_exists('./gen_id.json')) {
		let o = JSON.parse(read_file('./gen_id.json'))
		return o.type ++
	} else {
		let o = {
			'user': 1,
			'team': 1,
			'hunt': 1,
		}
		write_file('./gen_id.json', JSON.stringify(o))
		return 1
	}
}