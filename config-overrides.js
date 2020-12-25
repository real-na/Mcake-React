const {override,addBabelPlugin,addBabelPlugins, addDecoratorsLegacy,disableEsLint,useBabelRc,fixBabelImports} = require('customize-cra')


module.exports = override(
    addDecoratorsLegacy(),//装饰器支持

    // addBabelPlugin("@babel/plugin-proposal-decorators", { "legacy": true }),
    // addBabelPlugins(),
    disableEsLint(),//禁用EsLint检查功能
    //useBabelRc(),
    // fixBabelImports('import',{ libraryName: "antd", style: "css" }), //ui框架按需引入
    fixBabelImports('import', {libraryName: 'antd-mobile',style: 'css'}),
)