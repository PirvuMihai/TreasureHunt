let fs     = require('fs')
let crypto = require('crypto')

pr = console.error

file_exists = function(path) {
	return !!fs.statSync(path, {throwIfNoEntry: false})
}

hash = async function(s) {
	return await crypto.createHash('sha256').update(s).update(SERVER_SECRET).digest('hex')
}