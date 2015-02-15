var clint = require('clint')(),
    path = require('path'),
    fs = require('fs'),
    parser = require('./src/LinqParser'),
    transformer = require('./src/JSTransformer'),
    options = {
      help: false,
      file: null
    }

// clint commands
clint.command('--file', '-f', 'The linq file')

// options switcher
clint.on('command', function(name, value) {
  switch (name) {
    case '--help':
      options.help = true
      break
    case '--file':
      options.file = value
      break
  }
})

function start(linq, relativePath){
  console.log(transformer(parser(linq)));
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
