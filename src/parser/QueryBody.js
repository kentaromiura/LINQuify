var FinalQueryClause = require('./FinalQueryClause')
//query-body ::= query-body-clause* final-query-clause query-continuation?
var whatsNext = require('./utils/next')(['from', 'join', 'let', 'where', 'orderby'])
var WhereClause = require('./WhereClause');

function QueryBody(mutableSource){

  // TODO: handle querybodyclauses and querycontinuation

  this.queryBodyClauses = []
  var next
  while (next = whatsNext(mutableSource.source)){
    switch(next){ //todo: implement dependency injection
      case 'from':
      case 'join':
      case 'let':
      case 'orderby':
        throw new Error('not yet implemented');
        return
      case 'where':
        this.queryBodyClauses.push(WhereClause(mutableSource))
    }
  }
  this.finalQueryClause = FinalQueryClause(mutableSource);
  this.queryContinuation = null;
}

module.exports = function(mutableSource){
  return new QueryBody(mutableSource)
}
