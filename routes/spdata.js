var express = require('express')
var router = express.Router()

var monk = require('monk')
var db = monk('klmdbuser:klmadmin@ds147905.mlab.com:47905/klmdemodb')
var collection = db.get('passenger_details')

router.get('/:id', function(req, res){
	collection.findOne({_id: req.params.id}, function(err, udata){
		if (err) {throw err}
		res.json(udata)
	})
})

module.exports = router