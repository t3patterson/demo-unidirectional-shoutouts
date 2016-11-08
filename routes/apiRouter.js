let Router = require('express').Router;
const apiRouter = Router()

/*
 * NOTE: the model for the data-table should not have the name 'ShoutOut'
 */
let ShoutOut = require('../db/schema.js').ShoutOut

apiRouter
/*
 * NOTE: the route should have a name that matches the name of the data-table
 */
 .get('/shoutouts', function(req, res){
   ShoutOut.find(req.query , function(err, results){
     if(err) return res.json(err)
     res.json(results)
   })
 })
 .post('/shoutouts', function(req, res){
     let newRecord = new ShoutOut(req.body)

     newRecord.save(function(err, record){
        if(err) return res.status(500).send('server/db error on attempt to save user to db')
        let objCopy = newRecord.toObject()
        delete objCopy.password
        res.json(objCopy)
     })
 })


apiRouter
 .get('/shoutouts/:_id', function(req, res){
   ShoutOut.findById(req.params._id, "-password", function(err, record){
     if(err || !record ) return res.json(err)
     res.json(record)
   })
 })

 .put('/shoutouts/:_id', function(req, res){

   ShoutOut.findByIdAndUpdate(req.params._id, req.body, function(err, record){
       if (err) {
         res.status(500).send(err)
       }
       else if (!record) {
         res.status(400).send('no record found with that id')
       }
       else {
         res.json(Object.assign({},req.body,record))
       }
   })
 })

 .delete('/shoutouts/:_id', function(req, res){
   ShoutOut.remove({ _id: req.params._id}, (err) => {
     if(err) return res.json(err)
     res.json({
       msg: `record ${req.params._id} successfully deleted`,
       _id: req.params._id
     })
   })
 })

 // TO DELETE ALL:
 // .delete("/shoutouts/all/records", function(req, res){
 //   ShoutOut.remove({}, (err) => {
 //     if(err) return res.json(err)
 //     res.json({
 //       msg: `EVEYTHING successfully deleted`
 //     })
 //   })
 // })

module.exports = apiRouter
