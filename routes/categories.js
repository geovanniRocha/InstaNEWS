var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
  
router.get('/:tk', function(req, res, next) {
   var id = req.params.tk;
  knex.select(['users.email', 'categories.name']).from('users').where("users.token", id)
  .innerJoin('users_has_categories', 'users.idusers', 'users_idusers')
  .innerJoin('categories', 'categories.idcategories','users_has_categories.categories_idcategories')
  .timeout(1000)
  
  .then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
  // next()
});
 
router.get('/', function(req, res, next) {

  knex.select().from('categories').timeout(1000).limit(20).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
 // res.send(resp);
 // next()
});

router.post('/', function(req, res) {
  var token = req.body.token;
  var categoriesArray = req.body.categories;
  knex.select('idusers').from('users').where("users.token", token).then (e=>{
    console.log(e);
      global.data = {
        users_idusers : e[0].idusers,
        categories_idcategories: categoriesArray
        }
      _.forEach(categoriesArray, p=>{
        knex('users_has_categories').insert({
          users_idusers :global.data.users_idusers,
          categories_idcategories: p
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
    
    knex("users_has_categories").where("users_idusers",resp[0].idusers).del().then()
  }) 
  res.send() 
  return 200; 
});

router.get('/:id/news', function(req, res, next){
  var id = req.params.id;
  knex.select().from('categories').where("idcategories", id)
  
  .innerJoin("feed","feed.categories_idcategories", 'categories.idcategories')
  .innerJoin('news', 'news.feed_idfeed','feed.idfeed') 
  .orderBy("news.date","DESC")
  .timeout(1000)
  .then(rQuery =>{
    res.send(rQuery)
  })
 
})


module.exports = router;
