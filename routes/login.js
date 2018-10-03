var express = require('express')
var router = express.Router()
var knex = require('./db') 
const sha1 = require("sha1")
var httpStatus = require('http-status-codes')


// Login. Return user's access token
router.post('/', function(req, res) {
  
  let email = req.body.email;
  
  if( email === "" || email === null)
  {
    
    res.status(httpStatus.UNPROCESSABLE_ENTITY);

    res.send({
      token: null,
      message: "Campo de email deve ser enviado"
    });
    
    return httpStatus.UNPROCESSABLE_ENTITY;
  }

  knex.select('users.token')
  .from('users')
  .where("email", email)
  .timeout(1000)  
  .then(rSet => {

    if (rSet.length === 0 )
    {
      res.status(httpStatus.UNAUTHORIZED);
      
      res.send({
        token: null,
        message: "Usuario não encontrado"
      })

      return httpStatus.UNAUTHORIZED;
    }
    
    res.status(httpStatus.OK);
    
    res.send({
      token: rSet[0].token
    });

  })
  .error(e => {
    console.log(e)
  })
      
  return httpStatus.OK;

});

// Change a valid user's access token to a new one. So in that way, user has to login again to get a new valid access token
router.delete('/', function(req, res){

  let token    = req.headers.authorization.toString()
  
  let newToken =  sha1(Date.now()).toString()
  
  knex('users')
  .where('users.token', '=',token)
  .update({token : newToken})
  .then(result => {
    
    if(result)
    {
      res.send({
        message: "OK"
      })

      return httpStatus.OK;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR);

    res.send({
      message : "Erro ao invalidar token"
    })
  
  })  
})

module.exports = router;
