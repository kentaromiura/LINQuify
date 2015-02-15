var notQueryBody = require('./notQueryBody')

function FromClause(itemName, srcExpression){
  this.itemName = itemName
  this.srcExpression = srcExpression
}

//from-clause ::= from itemName in srcExpr
module.exports = function(mutableSource){

  var source = mutableSource.source,
      regExp = /\s*from\s*(.*?)\s*in\s*(.*)/gm,
      matches = regExp.exec(source),
      srcExpression = notQueryBody(matches[2]);

  mutableSource.source = source.substring(source.indexOf(srcExpression) + srcExpression.length)

  return new FromClause(matches[1], srcExpression)
}
