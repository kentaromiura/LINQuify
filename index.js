var clint = require('clint')(),
    path = require('path'),
    fs = require('fs'),
    parser = require('./src/LinqParser'),
    transformer = require('./src/JSTransformer'),
    astTransformer = require('./src/astTransform'),
    options = {
      help: false,
      file: null,
      debug: false,
      ast: false
    }

// clint commands
clint.command('--file', '-f', 'The linq file')
clint.command('--debug', '-d', 'debug messages')
clint.command('--ast', '-a', 'use the ast transformer')

// options switcher
clint.on('command', function(name, value) {
  switch (name) {
    case '--help':
      options.help = true
      break
    case '--file':
      options.file = value
      break
    case '--ast':
      options.ast = true
      break
    case '--debug':
      options.debug = true
      break
  }
})

function start(linq, relativePath){
  var ast = parser(linq)
  if(options.debug){
    console.log('source:\n', linq, '\n')
    console.log('AST:\n', JSON.stringify(ast, null, 2), '\n')
  }
  if(options.ast) transformer = astTransformer
  console.log(transformer(ast));
}

// command handler
clint.on('complete', function() {
  if (options.help || !options.file) {
    console.log(clint.help(2, " : "))
    console.log('Use -f index.linq')
    process.exit(0)
  }

  var relativePath = path.dirname(options.file) + '/'
  var linq
  try {
     linq = '' + fs.readFileSync(options.file)
  } catch (e) {
    console.log("Error while opening ", options.file)
    process.exit(1)
  }

  start(linq, relativePath)
})

clint.parse(process.argv.slice(2))
