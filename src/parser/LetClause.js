var notQueryBody = require('./utils/notQueryBody')

function LetClause(itemName, selectExpression){
  this.itemName = itemName
  this.selectExpression = selectExpression
}

//let-clause ::= let itemName = selExpr
module.exports = function(mutableSource){

  var source = mutableSource.source,
      regExp = /\s*let\s+(.*)\s*=\s*(.*)\s*/gm,
      matches = regExp.exec(source),
      srcExpression = notQueryBody(matches[2])

  mutableSource.source = source.substring(source.indexOf(srcExpression) + srcExpression.length)
  return new LetClause(matches[1], matches[2])
}
