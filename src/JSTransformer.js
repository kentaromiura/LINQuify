function name(obj){
  return obj.constructor && obj.constructor.name || Object.prototype.toString.call(obj).slice(8, -1)
}
function genFinal(output, finalQueryClause, from, pre, post){
  console.log(name(finalQueryClause))
  switch(name(finalQueryClause)){
    case 'SelectClause':
      output.push('.map(function(', from.itemName, '){',
        'return ',
          pre.join(''),
          finalQueryClause.selectExpression ,
          post.join(''),
      '})')
      break
    case 'GroupByClause':
      output.push('.reduce(function(prev, ', finalQueryClause.selectExpression,'){',
        'return (prev[', finalQueryClause.keyExpression,'] || (prev[', finalQueryClause.keyExpression, '] = [])).push(', finalQueryClause.selectExpression,'), prev',
      '}, {})')
      break


  }
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

  genFinal(output, body.finalQueryClause, from, pre, post)
  output.push(after.join(''))
  return output.join('')
}
