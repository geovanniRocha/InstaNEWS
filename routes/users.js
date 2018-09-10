var express = require('express');
var router = express.Router();
var knex = require('./db')
 
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
 var em = req.body.email;
 //var tk = req.body.token;
  //knex("users").where("email", id).update("token",'tk').then();
  knex.select('users.token').from('users').where("email", em).timeout(1000)  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200; 
});

module.exports = router;
