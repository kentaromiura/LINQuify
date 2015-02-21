var SelectClause = require('./SelectClause'),
    GroupByClause = require('./GroupByClause')
var whatsNext = require('./utils/next')(['select', 'group'])

//final-query-clause ::= (select-clause | groupby-clause)
module.exports = function(mutableSource){
  switch(whatsNext(mutableSource.source)){
    case 'select':
      return SelectClause(mutableSource)
      break
    case 'group':
      return GroupByClause(mutableSource)
    default:
      throw new Error('parse error in finalQueryClause');
      break
  }
}
