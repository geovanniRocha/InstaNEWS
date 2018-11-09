var express = require('express');
var router = express.Router();
const _ = require('lodash')
var knex = require('./db')
var elastic = require('./elastic')
var httpStatus = require('http-status-codes');
  
//retorna todas as noticias de um feed inscrito
router.get('/subs', function(req, res, next) {

  let authorizationToken = req.headers.authorization;

  knex.select(
    ["news.Title", "news.description", 'news.url', "news.date"]
  )
  .from('users')
  .where("users.token", authorizationToken)
  .innerJoin("subscription",  'users.idusers',"subscription.users_idusers")
  .innerJoin("feed","feed.idfeed", 'subscription.feed_idfeed')
  .innerJoin('news', 'news.feed_idfeed','feed.idfeed') 
  .orderBy("news.date","DESC")
  .timeout(1000)   
  .then(rSet =>{
    
    res.send({
      status: 'ok',
      totalResults: _.size(rSet),
      articles: rSet
    });

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

//retorna as noticias da categoria pelo id
router.get('/category/:cat', function(req, res, next) { 
  
  let category = req.params.cat;
  
  knex.select(
    ["news.Title", "news.description", 'news.url', "news.date"]
  )
  .from('news')    
  .innerJoin("feed","feed.idfeed", 'news.feed_idfeed')
  .where('feed.categories_idcategories',category)
  .orderBy("news.date","DESC").limit(25)  
  .timeout(1000)
	
  .then(rSet =>{
    
    res.send({
      status: 'ok',
      totalResults: _.size(rSet),
      articles:rSet
    });

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


// Retorna as últimas 5 notícias.
router.get('/breaking', function(req, res, next){

  //knex.select().from('news').innerJoin("feed","feed.idfeed", 'news.feed_idfeed').where('feed.categories_idcategories',category).orderBy("news.date","DESC").timeout(1000) 
  knex.select().from('news').innerJoin("feed","feed.idfeed", 88).limit(100).orderBy("news.date","DESC").timeout(1000).limit(5)
  .then(rSet =>{
    
    res.send({
      status : 'ok',
      totalResults : _.size(rSet),
      articles: rSet
    });

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


//retorna pesquisas que contenham fragmentos de palavras
router.get('/like/:word', function(req, res){
  
  let word = req.params.word;
  
  knex.select().from('news') 
  .whereRaw('LOWER(title) LIKE ?', '%'+word.toLowerCase()+'%')
  .orderBy("news.date","DESC").timeout(1000).limit(5)
  .then(rSet => {
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet),
      articles:rSet
    });

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

router.get('/', function(req, res) {

  knex.select().from('news').limit(100).orderBy("news.date","DESC").timeout(10000)
  .then(rSet =>{
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet),
      articles:rSet
    });
    
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

//ELASTIC SEARCH \/

//retorna as noticias da categoria pelo id
router.get('/v2/category/:cat', function(req, res, next) { 
  
  let category = req.params.cat;
  elastic.search({
    index:"instanews",
    body:{
      query: {
        match :{categories_idcategories : category}
      },
      sort:{date: { order : "desc" }}
    }
  })
  .then(rSet =>{
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet.hits.hits),
      articles:rSet.hits.hits
    });
    
    return httpStatus.OK;
  }, err=> {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({message: e.message});
    return httpStatus.INTERNAL_SERVER_ERROR;  
  })
});


// Retorna as últimas 5 notícias.
router.get('/v2/breaking', function(req, res, next){

  elastic.search({
    index:"instanews",
    body:{
    sort:{date: { order : "desc" }}
    }
  })
  .then(rSet =>{
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet.hits.hits),
      articles:rSet.hits.hits
    });
    
    return httpStatus.OK;
  }, err=> {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({message: e.message});
    return httpStatus.INTERNAL_SERVER_ERROR;  
  })

});


//retorna pesquisas que contenham fragmentos de palavras
router.get('/v2/like/:word', function(req, res){
  
  let word = req.params.word;
  
  elastic.search({
    index:"instanews",
    body:{
      query: {
        wildcard : {description : word }
      },
      sort:{date: { order : "desc" }}
    }
  })
  .then(rSet =>{
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet.hits.hits),
      articles:rSet.hits.hits
    });
    
    return httpStatus.OK;
  }, err=> {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({message: e.message});
    return httpStatus.INTERNAL_SERVER_ERROR;  
  })
});

//Retorna 10 valores  do banco 
router.get('/v2', function(req, res) {

  elastic.search({
    index:"instanews",
    body:{
    sort:{date: { order : "desc" }}
    }
  })
  .then(rSet =>{
    
    res.send({
      status:'ok',
      totalResults:_.size(rSet.hits.hits),
      articles:rSet.hits.hits
    });
    
    return httpStatus.OK;
  }, err=> {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({message: e.message});
    return httpStatus.INTERNAL_SERVER_ERROR;  
  })


})
 
module.exports = router;
