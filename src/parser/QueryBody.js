//query-body ::= query-body-clause* final-query-clause query-continuation?
var whatsNext = require('./utils/next')(['from', 'join', 'let', 'where', 'orderby']),
    WhereClause = require('./WhereClause'),
    FromClause = require('./FromClause'),
    FinalQueryClause = require('./FinalQueryClause')

function QueryBody(mutableSource){

  // TODO: handle querybodyclauses and querycontinuation

  this.queryBodyClauses = []
  var next
  while (next = whatsNext(mutableSource.source)){
    switch(next){ //todo: implement dependency injection

      case 'join':
      case 'let':
      case 'orderby':
        throw new Error('not yet implemented');
        return
      case 'where':
        this.queryBodyClauses.push(WhereClause(mutableSource))
      break
      case 'from':
        this.queryBodyClauses.push(FromClause(mutableSource))
        break
    }
  }
  this.finalQueryClause = FinalQueryClause(mutableSource);
  this.queryContinuation = null;
}

module.exports = function(mutableSource){
  return new QueryBody(mutableSource)
}
