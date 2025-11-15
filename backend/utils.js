let fs     = require('fs')
let crypto = require('crypto')
let path   = require('path')

pr = console.error

// Mock DB

get_users = function() {
	users = {}
	for (let file of read_dir('users')) {
		users[path.win32.basename(file, '.json')] = JSON.parse(file)
	}
	return users
}

add_user = function(user) {
	user.id = next_id('user')
	write_file(user_path(user.id), JSON.stringify(user))
	return user
}

save_user = function(user_id) {
	write_file(user_path(user_id), JSON.stringify(users[user_id]))
}

get_teams = function() {
	teams = {}
	for (let file of read_dir('team')) {
		teams[path.win32.basename(file, '.json')] = JSON.parse(file)
	}
	return teams
}

add_team = function(team) {
	team.id = next_id('team')
	write_file(team_path(team.id), JSON.stringify(team))
	return team
}

save_team = function(team) {
	write_file(team_path(team.id), JSON.stringify(team))
}

// Crypto utils

hash = async function(s) {
	return await crypto.createHash('sha256').update(s).update(SERVER_SECRET).digest('hex')
}

// Auth utils

generate_session = function(user_id) {
	let user = users[user_id]
	user.session = crypto.randomBytes(64).toString('hex')
	save_user(user.id)
	return user.session
}

check_login = function(cookie) {
	cookie = decodeURIComponent(cookie)
	let [username_hash, user_id, user_session] = cookie.split('|||')
	if (!users[user_id]
		|| hash(users[user_id].username) != username_hash
		|| users[user_id]?.session != user_session
		)
		return [1, 'No such user exists in the database.']
	return [0, '']
}

// FS utils

db_path = function(dir) {
	return path.normalize(process.cwd() + '/var/' + dir)
}

file_exists = function(path) {
	return fs.existsSync(path)
}

write_file = function(file, data) {
	return fs.writeFileSync(file, data)
}

read_file = function(path) {
	return fs.readFileSync(path)
}

mkdir = function(path) {
	if (!fs.existsSync(path))
		fs.mkdir(path, {recursive: true})
}

read_dir = function(dir) {
	return fs.readdirSync(db_path(dir))
}

user_path = function(user_id) {
	return db_path('users') + '/' + user_id + '.json'
}

team_path = function(team_id) {
	return db_path('teams') + '/' + team_id + '.json'
}

// Number utils

// Type -> user, team, hunt
next_id = function(type) {
	if (file_exists('./gen_id.json')) {
		let o = JSON.parse(read_file('./gen_id.json'))
		return o.type ++
		write_file('./gen_id.json', JSON.stringify(o))
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