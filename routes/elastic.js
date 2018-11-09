
var elasticsearch = require('elasticsearch');
var esclient = new elasticsearch.Client({
  host: 'http://ec2-54-200-242-42.us-west-2.compute.amazonaws.com:9200'
});
module.exports = esclient;
