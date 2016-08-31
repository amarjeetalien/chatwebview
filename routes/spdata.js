var express = require('express')
var router = express.Router()

var monk = require('monk')
var db = monk('klmdbuser:klmadmin@ds147905.mlab.com:47905/klmdemodb')
var collection = db.get('passenger_details')

router.get('/:sid', function(req, res){
	console.log(" ========> req.params.sid : " +  req.params.sid)
	collection.find( { $where: function(err, udata) {return (this._sid == req.params.sid)} , 
	function(err, udata){
		if (err) {throw err}
		res.json(udata)
		}
	})
})

module.exports = router
