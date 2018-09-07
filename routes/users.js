var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'instanews'
  }
});
 
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  // res.send(JSON.stringify(req.params));
  var id = req.params.id;
  var resp = knex.select().from('users').where("email", id).timeout(1000)
  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
  // next()
});

router.get('/', function(req, res, next) {

  var resp = knex.select('token').from('users').limit(1).timeout(1000).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
//  res.send(resp);
 // next()
});

router.post('/', function(req, res) {
 var id = req.body.id;
 var tk = req.body.token;
  knex("users").where("email", id).update("token",'tk').then();
  knex.select("*").from('users').where("email", id).timeout(1000)  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200; 
});

module.exports = router;
