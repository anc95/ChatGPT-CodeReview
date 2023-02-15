const config = {
  apps : [{
    name      : 'My Application',
    script    : 'dist/index.js',
    node_args : '-r dotenv/config',
  }]
}

module.exports = config;