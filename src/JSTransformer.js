function name(obj){
  return obj.constructor && obj.constructor.name || Object.prototype.toString.call(obj).slice(8, -1)
}

module.exports = function(ast){
  var from = ast.fromClause,
      body = ast.queryBody,
      clauses = body.queryBodyClauses,
      output = [from.srcExpression],
      after = [], //after everything
      pre = []; // before a select
      post = []; // after a select

  // Very basic first implementation of the transform (not using AST yet)
  if (clauses) {
    clauses.forEach(function(clause){
      switch(name(clause)){
        case 'WhereClause':
          output.push('.filter(function(', from.itemName,'){',
            'return ', clause.predicate,
          '})')
          break
        case 'FromClause':

          output.unshift('[].concat.apply([],')
          after.push(')')

          pre.push(clause.srcExpression, '.map(function(',clause.itemName,'){return ')
          post.push('})')
          break
      default:
        throw new Error('not yet implemented')
      }
    })
  }

  output.push('.map(function(', from.itemName, '){',
    'return ',
      pre.join(''),
      body.finalQueryClause.selectExpression ,
      post.join(''),
  '})')
  output.push(after.join(''))
  return output.join('')
}
