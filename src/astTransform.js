var nodes = require('nodes'),
    parse = require('esprima').parse,
    generate = require('escodegen').generate,
    genOptions = {
      format: {
        semicolons: false
      }
    }

var tpl = {
 compile: function(template){
   var me = this;

   return function(data){
       return me.render(template, data);
   }
 },
 render: function(template, data){
        return (''+template).replace(/\{\{(.*?)\}\}/gm, function(match, capture){
            var current = data, error = false
                var tree = capture.split('.');
                for(var i=0, max=tree.length; i<max; i++){

                    if(typeof current[tree[i]] !== 'undefined'){
                        current = current[tree[i]];
                    }else{
                        error = true;
                        break;
                    }
                }
                if(error){
                    return match;
                }else{
                    return ''+current;
                }
        });
    }
}

function log(obj){
  console.log(JSON.stringify(obj, null, 2))
}

function name(obj){
  return obj.constructor && obj.constructor.name || Object.prototype.toString.call(obj).slice(8, -1)
}

module.exports = function(ast){
  var from = ast.fromClause,
      lastfrom = from.itemName
      body = ast.queryBody,
      clauses = body.queryBodyClauses,
      template = from.srcExpression.replace(/\s+$/,'') + "{{placeholder}}",
      lastWasFrom = true

  clauses.forEach(function(clause){
    switch(name(clause)){
      case 'WhereClause':

        var data = {lastfrom:lastfrom, predicate: clause.predicate};
        if(lastWasFrom && lastfrom != from.itemName) {
          var root = parse(tpl.render(template, {placeholder: '__PLACEHOLDER__'}));
          var node = nodes.default(root);
          var find = node.search('#ReturnStatement > #Identifier[name=__PLACEHOLDER__] ! #CallExpression')[0];
          find.callee.property.name='filter'

          var type = nodes.nodes;

          var exp = new type.CallExpression()
          exp.callee = new type.MemberExpression();
          find.parentNode.replaceChild(find, exp) // need to replace find before associating it (weird)
          exp.callee.object = find; //apparently this MOVES the node.
          exp.callee.property = new type.Identifier();
          exp.callee.property.name = '__PLAZEHOLDER__'

          template = tpl.render(generate(node, genOptions).replace('__PLACEHOLDER__', '{{placeholder}}'),{
            placeholder: data.predicate
          }).replace('.__PLAZEHOLDER__()','{{placeholder}}')
        } else {
          template = tpl.render(template,
            {
              placeholder: tpl.render(
                '.filter(function({{lastfrom}}){return {{predicate}} }){{placeholder}}',
                data
              )
            }
          )
        }
        lastWasFrom = false
        break
      case 'FromClause':

        var fromtemplate = ['.map(function({{lastfrom}}){',
          'return {{clause}}.map(function({{itemname}}){',
            'return {{placeholder}}',
          '})',
        '})'].join('')

        if(lastWasFrom){
          fromtemplate = ['{{clause}}.map(function({{itemname}}){',
            'return {{placeholder}}',
          '})'].join('')
        }
        template = tpl.render(template, {placeholder:
          tpl.render(fromtemplate,
            {lastfrom:lastfrom, clause: clause.srcExpression, itemname:clause.itemName}
          )
        })
        template = '[].concat.apply([],' + template + ')'
        lastfrom = clause.itemName
        lastWasFrom = true

        break
    default:
      throw new Error('not yet implemented')
    }
  })
  var finalQuery = body.finalQueryClause
  switch(name(finalQuery)){
    case 'SelectClause':
      var placeholder = finalQuery.selectExpression

      if (lastfrom === from.itemName || !lastWasFrom){
        //needs to map
        placeholder = tpl.render('.map(function({{lastfrom}}){return {{expression}}})', {
          lastfrom:lastfrom,
          expression: finalQuery.selectExpression
        })
      }
      template = tpl.render(template, {
        placeholder: placeholder
      })
      break
    case 'GroupByClause':
      template = tpl.render(template,{
          placeholder : [(lastWasFrom  && lastfrom != from.itemName ? lastfrom : '') + '.reduce(function(prev, ', finalQuery.selectExpression,'){',
          'return (prev[', finalQuery.keyExpression,'] || (prev[', finalQuery.keyExpression, '] = [])).push(', finalQuery.selectExpression,'), prev',
        '}, {})'].join('')
      })
      break
  }

  //console.log(JSON.stringify(root, null, 2))
  return tpl.render(template, {placeholder: ''})
}
