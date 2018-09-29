var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
  
router.get('/', function(req, res, next) {
  var id = req.headers.authorization;
  console.log(id);
  if(req.headers.hasOwnProperty('authorization')){
    knex.select(['categories.idcategories', 'categories.name']).from('users').where("users.token", id)
    .innerJoin('users_has_categories', 'users.idusers', 'users_idusers')
    .innerJoin('categories', 'categories.idcategories','users_has_categories.categories_idcategories')
    .timeout(1000)
    
    .then(rSet =>{
      res.send(rSet);
    }).error(e=>{
      res.send({erro:"Usuario nao identificado"})
    })
    return 200;
  }else{
    knex.select().from('categories').timeout(1000).limit(20).then(rSet =>{
      res.send(rSet);
    }) 
    return 200;
  }
  // next()
});

router.post('/', function(req, res) {
  var token = req.headers.authorization;
  var categoriesArray = req.body.categories;
  knex.select('idusers').from('users').where("users.token", token).then (e=>{
     
    global.data = {
      users_idusers : e[0].idusers,
      categories_idcategories: categoriesArray
    }
    console.log(global.data)
    _.forEach(categoriesArray, p=>{
      knex('users_has_categories').insert({
        users_idusers :global.data.users_idusers,
        categories_idcategories: p
      }).then(e=>{
        console.log(e)
        
        res.send(e) 
      })   
    }) 
  })    
  return 200; 
});

/*
router.delete("/:tk", function(req, res) { 
  var tk = req.params.tk;
  knex.select('idusers').from('users').where("users.token",tk).then(resp=>{
    
    knex("users_has_categories").where("users_idusers",resp[0].idusers).del().then()
  }) 
  res.send() 
  return 200; 
});

router.get('/news', function(req, res, next){
  var id =  req.headers.authorization;
  knex.select().from('categories').where("idcategories", id)
  
  .innerJoin("feed","feed.categories_idcategories", 'categories.idcategories')
  .innerJoin('news', 'news.feed_idfeed','feed.idfeed') 
  .orderBy("news.date","DESC")
  .timeout(1000)
  .then(rQuery =>{
    res.send(rQuery)
  }).error((e)=>{
    res.send(e)
  })
 
})
*/
module.exports = router;
