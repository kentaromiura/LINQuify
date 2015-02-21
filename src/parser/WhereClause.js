var notQueryBody = require('./utils/notQueryBody')

function WhereClause(predicate){
  this.predicate = predicate
}

//where-clause ::= where predExpr
module.exports = function(mutableSource){

  var source = mutableSource.source,
      regExp = /\s*where\s+(.*)\s*/gm,
      matches = regExp.exec(source),
      srcExpression = notQueryBody(matches[1]);

  mutableSource.source = source.substring(source.indexOf(srcExpression) + srcExpression.length)
  return new WhereClause(srcExpression)
}
