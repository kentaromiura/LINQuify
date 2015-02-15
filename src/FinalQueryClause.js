var SelectClause = require('./SelectClause')

// TODO: refactor this using Array#reduce making it generic
function whatsNext(source){
  var sourcePosition = source.indexOf('select'),
      groupPosition = source.indexOf('group'),
      result = 'group'

  if (~sourcePosition && (sourcePosition < groupPosition || !~groupPosition)) result = 'select'

  return result;
}

//final-query-clause ::= (select-clause | groupby-clause)
module.exports = function(mutableSource){
  switch(whatsNext(mutableSource.source)){
    case 'select':
      return new SelectClause(mutableSource)
      break
    case 'group':
      //todo: handle groups
      return 'TODO'
      break
  }
}
