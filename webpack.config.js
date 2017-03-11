function buildConfig(env) {
    return require('./webpack.config.'+env)
}

module.exports = buildConfig;