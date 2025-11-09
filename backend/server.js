require('./utils.js')

//overwrite in config
PORT             = 3000
DOMAIN           = 'localhost'
SERVER_SECRET    = '12345678abcdef'

if (file_exists('./config.js'))
	require('./config.js')

let a = process.argv

if (a.length == 2 || a?.[2] == 'server') {
	start_server()
} else {
	// do we need cmdline?
}

function start_server() {

	let express  = require('express')
	let router   = require('./router')

	let server = express()

	users = get_users()

	server.use(express.json())
	server.use('/api', router)

	server.listen(PORT, DOMAIN, function() {
		console.log('The server is listening on '+DOMAIN+':'+PORT)
	})

	server.get('/', function(req, res) {
		res.status(200).send('AAAAA')
	})
}
