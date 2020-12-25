const {
    createProxyMiddleware
} = require('http-proxy-middleware');
const baseUrl = 'http://120.27.231.166:3009/';

module.exports = function (app) {
    // /api 表示代理路径
    // target 表示目标服务器的地址
    app.use(
        createProxyMiddleware('/api', {
            // http://localhost:8080/ 地址只是示例，实际地址以项目为准
            target: baseUrl,
            // 跨域时一般都设置该值 为 true
            changeOrigin: true,
            // 重写接口路由
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}
