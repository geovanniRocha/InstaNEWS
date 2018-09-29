var express = require('express');
var router = express.Router();
var knex = require('./db') 
const sha1 = require("sha1")
 


//return a token
router.post('/', function(req, res) {
  global.em = req.body.email;
  knex.select('users.token').from('users').where("email", em).timeout(1000)  
  .then(rSet =>{
   res.send(rSet);
  })
      
  return 200; 
});

//change a valid auth token to a new invalid
router.delete('/', function(req, res){
  global.tk = req.headers.authorization.toString()
  global.newTk =  sha1(Date.now()).toString()
  knex('users').where('users.token', '=',global.tk).update({token : global.newTk}).then()
  res.send();  
})

module.exports = router;
