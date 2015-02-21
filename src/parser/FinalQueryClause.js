var SelectClause = require('./SelectClause')
var whatsNext = require('./utils/next')(['select', 'group'])

//final-query-clause ::= (select-clause | groupby-clause)
module.exports = function(mutableSource){
  switch(whatsNext(mutableSource.source)){
    case 'select':
      return new SelectClause(mutableSource)
      break
    case 'group':
      //todo: handle groups
      return 'TODO'
    default:
      throw new Error('parse error in finalQueryClause');
      break
  }
}
