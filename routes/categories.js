var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
var httpStatus = require('http-status-codes')

router.get('/', function(req, res) {
  
  if(req.headers.hasOwnProperty('authorization') && req.headers.authorization !== ""){
    
    let authorizationToken = req.headers.authorization;

    knex.select(['categories.idcategories AS id', 'categories.name']).from('users')
    .where("users.token", authorizationToken)
    .innerJoin('users_has_categories', 'users.idusers', 'users_idusers')
    .innerJoin('categories', 'categories.idcategories','users_has_categories.categories_idcategories')
    .timeout(1000)
    
    .then(rSet => {

      res.send(rSet);
    }).error(e => {
      
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      
      res.send({
        message: e.message
      })
    
    })

    return httpStatus.OK;
  }
  
  knex.select(['idcategories AS id','name']).from('categories').timeout(1000).limit(20)
  .then(rSet => { 
    
    res.send(rSet);
  });
  
  return httpStatus.OK;

});

router.post('/', function(req, res) {
  
  let authorizationToken = req.headers.authorization;

  let categories = req.body.categories;

  knex.select('idusers').from('users').where("users.token", authorizationToken)
  .then (result => {
    //TODO: REMOVE
    //knex('users_has_categories').where('users_idusers', result[0].idusers ).del().then().error();

    categories.forEach(category => {
      knex.select()
      .from("users_has_categories")
      .where({ 
        users_idusers           : result[0].idusers,
        categories_idcategories : category}).then(result=>{
          if(result.length){
            knex('users_has_categories').insert({
        
              users_idusers           : result[0].idusers,
              categories_idcategories : category
            })
            .then()      
          }

        });
      

    });

    res.status(httpStatus.OK);

      res.send({
        message: 'Categorias associada'
      });

  })    

  return httpStatus.OK; 

});


router.delete("/", function(req, res) {

  let authorizationToken = req.headers.authorization;
  
  if( authorizationToken === null || authorizationToken === "")
  {
    
    res.status(httpStatus.UNPROCESSABLE_ENTITY);

    res.send({
      message : 'Authorization token must be provided'
    })
    
    return httpStatus.UNPROCESSABLE_ENTITY;
  }

  let categories = req.body.categories;

  if( categories.length === 0 )
  {
    res.status(httpStatus.UNPROCESSABLE_ENTITY);

    res.send({
      message: 'Categories must be provided'
    })

    return httpStatus.UNPROCESSABLE_ENTITY;
  }

  knex.select('idusers AS id').from('users').where("users.token",authorizationToken)
  .then(result => {
    
    categories.forEach(category => {
      
      knex("users_has_categories")
      .where({
        users_idusers : result[0].id,
        categories_idcategories : category
      })
      .del()
      .then(r => {
        console.log(r)
      })
    });

    res.status(httpStatus.OK);
  
    res.send({
      message: 'Categorias deletada.'
    });

  })
  
  return httpStatus.OK

});

module.exports = router;
