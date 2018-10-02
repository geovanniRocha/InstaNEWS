var express = require('express');
var router = express.Router();
var knex = require('./db')
const _ = require('lodash')
const sha1 = require("sha1")
 
//Get * from user
router.get('/', function(req, res, next) {
  var tk = req.headers.authorization
  knex.select().from('users').where("users.token", tk) .timeout(1000)  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200; 
});

//DEBUG
router.get('/DEBUG', function(req, res, next) {

  knex.select().from('users').limit(100).timeout(1000).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
 // res.send(resp);
 // next()
});

//Add a new user by email
router.post('/', function(req, res) {
  global.em = req.body.email;
  
  knex.select('users.token').from('users').where("email", em).timeout(1000)  
  .then(rSet =>{
    if(_.isEmpty(rSet)){
      var r = knex('users').insert({
        email:em,
        token: sha1(em),
        lastUpdate:Date.now().toPrecision()
      }).then(r=>{
        knex.select('users.token').from('users').where("email", em).timeout(1000)  
        .then(rSet =>{
          res.send(rSet);
        })
      })      
    }
   
  }) 
  return 200; 
});

router.delete('/',function(req, res) {
  var tk = req.headers.authorization
  knex(" users").where('token', tk).del().then()
  res.send(200)
  return 200;

})
module.exports = router;
