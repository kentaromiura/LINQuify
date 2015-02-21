module.exports = function(keywords){
  return function(source){
    return keywords.reduce(function(prev, curr){
      var index = source.indexOf(curr),
          output = prev

      if (index !== -1) output = (!prev || index < source.indexOf(prev)) ? curr : prev

      return output
    }, null)
  }
}
