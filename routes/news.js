var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
  
//retorna todas as noticias de um feed inscrito
router.get('/subs', function(req, res, next) { 
  var id = req.headers.authorization;
  knex.select(
    ["news.Title", "news.description", 'news.url', "news.date"]
  ).from('users').where("users.token", id)
  .innerJoin("subscription",  'users.idusers',"subscription.users_idusers")
  .innerJoin("feed","feed.idfeed", 'subscription.feed_idfeed')
  .innerJoin('news', 'news.feed_idfeed','feed.idfeed') 
  .orderBy("news.date","DESC")
  .timeout(1000)   
  .then(rSet =>{
    if(_.size(rSet) > 0){
      out = {
        status:'ok',
        totalResults:_.size(rSet),
        articles:rSet
      }
      res.send(out)

    }
    else{
       res.send(404);
    }
  }) 
 
  return 200;  
});

//retorna as noticias da categoria pelo id
router.get('/category/:cat', function(req, res, next) { 
  var auth = req.headers.authorization;
  var cat = req.params.cat;
  knex.select(
    ["news.Title", "news.description", 'news.url', "news.date"]
  ).from('news')    
  .innerJoin("feed","feed.idfeed", 'news.idnews')
  .where('feed.categories_idcategories',cat)
  .orderBy("news.date","DESC")
  .timeout(1000) 
  .then(rSet =>{
    if(_.size(rSet) > 0){
      out = {
        status:'ok',
        totalResults:_.size(rSet),
        articles:rSet
      }
      res.send(out)

    }
    else{
       res.send(404);
    }
  }) 
 
  return 200;  
});

//NAO ta certo ainda, retorna as ultimas 5 noticias publicadas
router.get('/breaking', function(req, res, next){
  knex.select().from('news').limit(100).orderBy("news.date","DESC").timeout(1000).limit(5)
  .then(rSet =>{
    if(_.size(rSet) > 0){
      out = {
        status:'ok',
        totalResults:_.size(rSet),
        articles:rSet
      }
      res.send(out)

    }
    else{
       res.send(404);
    }
  }) 

});

//retorna pesquisas que contenham fragmentos de palavras
router.get('/like/:word', function(req, res, next){
  word = req.params.word;
  knex.select().from('news') 
  .whereRaw('LOWER(title) LIKE ?', '%'+word.toLowerCase()+'%')
  .orderBy("news.date","DESC").timeout(1000).limit(5)
  .then(rSet =>{
    if(_.size(rSet) > 0){
      out = {
        status:'ok',
        totalResults:_.size(rSet),
        articles:rSet
      }
      res.send(out)

    }
    else{
      out = {
        status:'ok',
        totalResults:0 
      }
    }
  }) 

});

router.get('/', function(req, res, next) {

  knex.select().from('news').limit(100).orderBy("news.date","DESC").timeout(1000).then(rSet =>{
    res.send(rSet);if(_.size(rSet) > 0){
      out = {
        status:'ok',
        totalResults:_.size(rSet),
        articles:rSet
      }
      res.send(out)

    }
    else{
       res.send(404);
    }
  }) 
  return 200;
 // res.send(resp);
 // next()
});







// router.post('/', function(req, res) {
//   var token = req.body.token;
//   var categoriesArray = req.body.categories;
//   knex.select('idusers').from('users').where("users.token", token).then (e=>{
//     console.log(e);
//       global.data = {
//         users_idusers : e[0].idusers,
//         feed_idfeed: categoriesArray
//         }
//       _.forEach(categoriesArray, p=>{
//         knex('subscription').insert({
//           users_idusers :global.data.users_idusers,
//           categories_idcategories: p
//         }).then(e=>{
//           console.log(e)
//         })   
//       }) 
//   })    
//   res.send("OK") 
//   return 200; 
// });

// router.delete("/:tk", function(req, res) { 
//   var tk = req.params.tk;
//   knex.select('idusers').from('users').where("users.token",tk).then(resp=>{
    
//     knex("users_has_categories").where("users_idusers",resp[0].idusers).del().then()
//   }) 
//   res.send() 
//   return 200; 
// });

module.exports = router;
