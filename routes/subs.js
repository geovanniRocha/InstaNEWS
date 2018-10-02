var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
  
router.get('/', function(req, res, next) {
  
  var token = req.headers.authorization; 
  if(req.headers.hasOwnProperty('authorization')){
    knex.select().from('users').where("users.token", token)
    .innerJoin('subscription', 'users.idusers', 'users_idusers')
    .innerJoin('feed', 'feed.idfeed','subscription.feed_idfeed')
    .timeout(1000)
    .then(rSet =>{
      res.send(rSet);
    }) 
    return 200;
  }else{
    knex.select().from('feed').timeout(1000).limit(20).then(rSet =>{
      res.send(rSet);
    }) 
    return 200;
  } 
});
 
 

router.post('/', function(req, res) {
  var token = req.headers.authorization; 
  var subsArray = req.body.subs;
  knex.select('idusers').from('users').where("users.token", token).then (e=>{
    console.log(e);
      global.data = {
        users_idusers : e[0].idusers,
        feed_idfeed: subsArray
        }
      _.forEach(subsArray, p=>{
        knex('subscription').insert({
          users_idusers :global.data.users_idusers,
          feed_idfeed: p
        }).then(e=>{
          console.log(e)
        })   
      }) 
  })    
  res.send("OK") 
  return 200; 
});

router.delete("/:tk", function(req, res) { 
  var token = req.headers.authorization; 
  knex.select('idusers').from('users').where("users.token",tk).then(resp=>{
    
    knex("subscription").where("users_idusers",resp[0].idusers).del().then()
  }) 
  res.send() 
  return 200; 
});


module.exports = router;
