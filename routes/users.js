var express = require('express');
var router = express.Router();

 
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send(JSON.stringify(req.params));
  next()
});

router.get('/', function(req, res, next) {
  res.send("JSON.stringify(req.params)");
  next()
});

router.post('/*', function(req, res) {
  
  res.send(JSON.stringify(req.body));
});

module.exports = router;
