PWD0 = process.cwd()

//overwrite in config
PORT   = 80
DOMAIN = 'localhost'

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

	server.use(express.json())
	server.use('/api', router)

	server.listen(PORT, DOMAIN, () => {
		console.log('The server is listening on '+DOMAIN+':'+PORT)
	})	

	server.get('/', function(req, res) {
		res.status(200).send('AAAAA')
	})
}
