function SelectClause(selectExpression){
  this.selectExpression = selectExpression
}
//select-clause ::= select selExpr
module.exports = function(mutableSource){
  var regExp = /\s*select\s+(.*)\s*/gm
  var matches = regExp.exec(mutableSource.source)
  //TODO: remove the code from the mutableSource (to allow continuation)
  return new SelectClause(matches[1]);
}
