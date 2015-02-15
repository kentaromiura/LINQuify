module.exports = function(ast){
  var from = ast.fromClause,
      body = ast.queryBody,
      output = [from.srcExpression]
  // Very basic first implementation of the transform (not using AST yet)
  output.push('.map(function(', from.itemName, '){',
    'return ', body.finalQueryClause.selectExpression ,
  '})')
  return output.join('')
}
