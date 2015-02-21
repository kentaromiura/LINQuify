//groupby-clause ::= group selExpr by keyExpr
function GroupByClause(selectExpression, keyExpression){
  this.selectExpression = selectExpression
  this.keyExpression = keyExpression
}
//select-clause ::= select selExpr
module.exports = function(mutableSource){
  var regExp = /\s*group\s+(.*)\s+by\s+(.*)\s*/gm
  var matches = regExp.exec(mutableSource.source)
  //TODO: remove the code from the mutableSource (to allow continuation)
  return new GroupByClause(matches[1], matches[2]);
}
