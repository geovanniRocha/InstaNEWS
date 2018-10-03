var express = require('express')
var router = express.Router()
const _ = require('lodash')
var knex = require('./db')
var httpStatus = require('http-status-codes')
  
router.get('/', function(req, res, next) {
  
  let authorizationToken = req.headers.authorization; 

  if(req.headers.hasOwnProperty('authorization')){

    let returnStatus = httpStatus.OK;

    knex.select([
      'users.idusers AS id',
      'users.email',
      'lastUpdate',
      'feed.idfeed as feed_id',
      'feed.name',
      'feed.url',
      'categories_idcategories as category_id'

    ])
    .from('users').where("users.token", authorizationToken)
    .innerJoin('subscription', 'users.idusers', 'users_idusers')
    .innerJoin('feed', 'feed.idfeed','subscription.feed_idfeed')
    .timeout(1000)
    .then(rSet =>{
      res.send(rSet);
    })
    .error(e => {
      
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
  
      res.send({
        message: e.message
      });
  
      returnStatus = httpStatus.INTERNAL_SERVER_ERROR;

    })

    return returnStatus;
  }

  knex.select([
    'users.idusers AS id',
    'users.email',
    'lastUpdate',
    'feed.idfeed as feed_id',
    'feed.name',
    'feed.url',
    'categories_idcategories as category_id'

  ])
  .from('feed').timeout(1000).limit(20)
  .then(rSet =>{

    res.send(rSet);

    return httpStatus.OK;
  })
  .error(e => {
      
    res.status(httpStatus.INTERNAL_SERVER_ERROR);

    res.send({
      message: e.message
    });

    return httpStatus.INTERNAL_SERVER_ERROR;

  })
  
});
 
 

router.post('/', function(req, res) {
  
  let token = req.headers.authorization; 
  
  let subsArray = req.body.subs;
  
  knex.select('idusers')
  .from('users')
  .where("users.token", token)
  .then(result => {
    
    console.log(result);

      let data = {
        users_idusers : result[0].idusers,
        feed_idfeed: subsArray
      }

      subsArray.forEach(el => {
        
        knex('subscription').insert({

          users_idusers : data.users_idusers,
          feed_idfeed   : el
        })
        .then(error=> {

          console.log(error)
        })
      });
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
