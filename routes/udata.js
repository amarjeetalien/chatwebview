var express = require('express')
var router = express.Router()

var monk = require('monk')
var db = monk('klmdbuser:klmadmin@ds147905.mlab.com:47905/klmdemodb')
var collection = db.get('passenger_details')

router.get('/', function(req, res){
	collection.find({}, function(err, udata){
		console.log(udata)
		if (err) {throw err}
		console.log(udata)
		res.json(udata)
	})
})

router.post('/', function(req, res){
	console.log("req.body.convid : " + req.body.convid + "\n req.params.convid : " + req.params.convid)
	collection.insert({
		convid: req.body.convid,
		title: req.body.title,
		fname: req.body.fname,
		mname: req.body.mname,
		lname: req.body.lname,
		ffnum: req.body.ffnum,
		email: req.body.email,
		offerfbm: req.body.offerfbm,
		fbluenum: req.body.fbluenum,
		updatefbm: req.body.updatefbm,
		passengertype: req.body.passengertype
	},function(err, udata){
		if (err) {throw err}
		res.json(udata)
	})
})

router.get('/:id', function(req, res){
	collection.findOne({_id: req.params.id}, function(err, udata){
		if (err) {throw err}
		res.json(udata)
	})
})

router.put('/:id', function(req, res){
	collection.update({
		_id: req.params.id
	},
	{
		convid: req.body.convid,
		title: req.body.title,
		fname: req.body.fname,
		mname: req.body.mname,
		lname: req.body.lname,
		ffnum: req.body.ffnum,
		email: req.body.email,
		offerfbm: req.body.offerfbm,
		fbluenum: req.body.fbluenum,
		updatefbm: req.body.updatefbm,
		passengertype: req.body.passengertype
	}, function(err, udata){
		if (err) {throw err}
		res.json(udata)
	})
})

router.delete('/:id', function(req, res){
	collection.remove({
		_id: req.params.id
	}, function(err, udata){
		if (err) {throw err}
		res.json(udata)
	})
})


module.exports = router
