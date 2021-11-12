const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envs) => {
    const { env } = envs;
    const envConfig = require(`./webpack.${env}.js`);
    return merge(commonConfig, envConfig);
}
