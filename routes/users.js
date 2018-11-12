var express = require('express')
var router = express.Router()
var knex = require('./db')
const _ = require('lodash')
const sha1 = require("sha1")
var httpStatus = require('http-status-codes')


router.get('/', function(req, res) {

  let authorizationToken = req.headers.authorization

  knex.select([
    'idusers as id',
    'email'
  ])
  .from('users')
  .where("users.token", authorizationToken)
  .timeout(1000)  
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

//DEBUG
router.get('/DEBUG', function(req, res, next) {

  knex.select()
  .from('users')
  .limit(100)
  .timeout(1000)
  .then(rSet =>{
    res.send(rSet);
  })

  return httpStatus.OK;
});

// Add a new user by email
router.post('/', function(req, res) {
    
  if( ! req.body['email'])
  {
    res.status(httpStatus.UNPROCESSABLE_ENTITY);

    res.send({
      message: 'Campo e-mail precisa ser enviado'
    });

    return httpStatus.UNPROCESSABLE_ENTITY;
  }

  let email = req.body.email;

  knex.select('users.token').from('users').where("email", email).timeout(1000).bind(email)
  .then(rSet =>{

    if(rSet.length == 0)
    {
      
      knex('users').insert({
        
        email:email,
        token: sha1(email)
      })
      .then(r=> {
        
        knex.select('users.token').from('users').where("email", email).timeout(1000)  
        .then(rSet => {
          res.send(rSet[0]);
        })

      })
      .error(e => {
      
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
    
        res.send({
          message: e.message
        });
    
        return httpStatus.INTERNAL_SERVER_ERROR;
    
      })
      
      return httpStatus.OK;
    }

    knex.select('users.token')
    .from('users')
    .where("email", email)
    .timeout(1000)  
    .then(rSet => {

      res.send(rSet[0]);
    })
    .error(e => {
      
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
    
        res.send({
          message: e.message
        });
    
        return httpStatus.INTERNAL_SERVER_ERROR;
    
      });

  });

  return httpStatus.OK;

});

router.delete('/',function(req, res) {

  let authorizationToken = req.headers.authorization
  
  knex("users").where('token', authorizationToken).del()
  .then(result => {
    
    res.send({
      status: 'ok'
    })

    return httpStatus.OK;
  })
  .error(e => {
      
    res.status(httpStatus.INTERNAL_SERVER_ERROR);

    res.send({
      message: e.message
    });

    return httpStatus.INTERNAL_SERVER_ERROR;

  })


})

module.exports = router;
