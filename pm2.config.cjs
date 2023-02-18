const config = {
  apps : [{
    name      : 'Bot',
    script    : 'dist/index.js',
    node_args : '-r dotenv/config',
  }]
}

module.exports = config;