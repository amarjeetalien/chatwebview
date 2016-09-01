var express = require('express')
var router = express.Router()

var monk = require('monk')
var db = monk('klmdbuser:klmadmin@ds147905.mlab.com:47905/klmdemodb')
var collection = db.get('passenger_details')

router.get('/:sid', function(req, res){
	/*collection.find({}, function(err, udata){
		console.log(udata)
		if (err) {throw err}
		console.log(udata)
		res.json(udata)
	})*/
	res.json({"names" : ["Mrs. Liona ver der Schoot"]})
})

module.exports = router
