function name(obj){
  return obj.constructor && obj.constructor.name || Object.prototype.toString.call(obj).slice(8, -1)
}

module.exports = function(ast){
  var from = ast.fromClause,
      body = ast.queryBody,
      clauses = body.queryBodyClauses,
      output = [from.srcExpression]
  // Very basic first implementation of the transform (not using AST yet)
  if (clauses) {
    clauses.forEach(function(clause){
      switch(name(clause)){
        case 'WhereClause':
          output.push('.filter(function(', from.itemName,'){',
            'return ', clause.predicate,
          '})')
          break
      default:
        throw new Error('not yet implemented')
      }
    })
  }

  output.push('.map(function(', from.itemName, '){',
    'return ', body.finalQueryClause.selectExpression ,
  '})')
  return output.join('')
}
