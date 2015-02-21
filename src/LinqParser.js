var FromClause = require('./parser/FromClause'),
    QueryBody = require('./parser/QueryBody')

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
