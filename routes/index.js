var express = require('express');
var router = express.Router();
var httpStatus = require('http-status-codes')

router.get('/', function(req, res, next) {
  res.status(httpStatus.UNAUTHORIZED)
  res.send({
    message: "Unauthorized"
  })
  
});

module.exports = router;


