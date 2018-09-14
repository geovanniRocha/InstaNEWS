var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
  
router.get('/:tk', function(req, res, next) {
  var id = req.params.tk;
  knex.select().from('users').where("users.token", id)
  .innerJoin('subscription', 'users.idusers', 'users_idusers')
  .innerJoin('feed', 'feed.idfeed','subscription.feed_idfeed')
  .timeout(1000)
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
  // next()
});
 
router.get('/', function(req, res, next) {

  knex.select().from('feed').timeout(1000).limit(20).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
});


router.post('/', function(req, res) {
  var token = req.body.token;
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
  var tk = req.params.tk;
  knex.select('idusers').from('users').where("users.token",tk).then(resp=>{
    
    knex("subscription").where("users_idusers",resp[0].idusers).del().then()
  }) 
  res.send() 
  return 200; 
});


module.exports = router;
