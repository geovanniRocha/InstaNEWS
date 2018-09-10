var express = require('express');
var router = express.Router();
var knex = require('./db')
 
//GET user categories by token
router.get('/:tk', function(req, res, next) {
  // res.send(JSON.stringify(req.params));
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

//get all categories
router.get('/', function(req, res, next) {

  knex.select().from('categories').timeout(1000).then(rSet =>{
    res.send(rSet);
  }) 
  return 200;
 // res.send(resp);
 // next()
});


//Adiciona as categorias para o usuario
// router.post('/', function(req, res) {
//  var id = req.body.id;
//  var tk = req.body.categories;
//  var cat = JSON.parse("["+tk+"]")
//   /*knex("users").where("email", id).update("token",'tk').then();
//   knex.select("*").from('users').where("email", id).timeout(1000)  
//   .then(rSet =>{
//     res.send(rSet);
//   }) */
//   res.send(req.body)
//   return 200; 
// });

module.exports = router;
