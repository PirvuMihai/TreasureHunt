
function validate_team_info(body) {

}

let team_controller = {
	create_team: async function(req, res) {
		let team = validate_team_info(req.body)
	}
}