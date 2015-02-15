var FromClause = require('./FromClause'),
    QueryBody = require('./QueryBody')

function QueryExpression(fromClause, queryBody){
  this.fromClause = fromClause
  this.queryBody = queryBody
}

module.exports = function(source){
  var mutableSource = {
    source: source
  },
  fromClause = FromClause(mutableSource),
  queryBody = QueryBody(mutableSource)

  return new QueryExpression(fromClause, queryBody);
}
