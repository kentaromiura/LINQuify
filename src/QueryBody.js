var FinalQueryClause = require('./FinalQueryClause')
//query-body ::= query-body-clause* final-query-clause query-continuation?
function QueryBody(mutableSource){

  // TODO: handle querybodyclauses and querycontinuation

  this.queryBodyClauses = []
  this.finalQueryClause = FinalQueryClause(mutableSource);
  this.queryContinuation = null;
}

module.exports = function(mutableSource){
  return new QueryBody(mutableSource)
}
