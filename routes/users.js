var express = require('express');
var router = express.Router();
var knex = require('./db')
const _ = require('lodash')
const sha1 = require("sha1")
 
/* GET users listing. */
/*
router.get('/:email', function(req, res, next) {
  // res.send(JSON.stringify(req.params));
  var id = req.params.id;
  knex.select('token').from('users').where("users.email", id) 
  .timeout(1000)
  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
  // next()
});
*/
router.get('/', function(req, res, next) {

  knex.select().from('users').limit(100).timeout(1000).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
 // res.send(resp);
 // next()
});
router.post('/', function(req, res) {
 global.em = req.body.email;
 //var tk = req.body.token;
  //knex("users").where("email", id).update("token",'tk').then();
  knex.select('users.token').from('users').where("email", em).timeout(1000)  
  .then(rSet =>{
    if(_.isEmpty(rSet)){
      var r = knex('users').insert({
        email:em,
        token: sha1(em),
        lastUpdate:Date.now()
      }).then(r=>{
        res.send(r)
      })      
    }
    knex.select('users.token').from('users').where("email", em).timeout(1000)  
    .then(rSet =>{
      res.send(rSet);
    })
    // console.log(rSet)
  }) 
  return 200; 
});

module.exports = router;
