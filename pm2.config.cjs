const config = {
  apps : [{
    name      : 'Bot',
    script    : 'dist/index.js',
    interpreter_args : '-r dotenv/config',
    time: true
  }]
}

module.exports = config;