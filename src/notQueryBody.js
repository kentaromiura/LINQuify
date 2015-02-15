var queryBodyStarter = ['from ', 'join ', 'let ', 'where ', 'orderby ', 'select ', 'group ', 'into ']

module.exports = function(everything){
  return queryBodyStarter.reduce(function(rest, current){
    return rest.split(current)[0]
  }, everything);
}
