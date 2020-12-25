// const baseUrl = 'http://120.27.231.166:3009';
const baseUrl = '';
const apiUrl = baseUrl + '/api';
// const apiUrl = baseUrl;
export function request(url,data,options){
    //这里的url值二级路由
    url = apiUrl + url;
    options.credentials = "include";
    if(options.method === 'get' || options.method === undefined){
        if(data){
            const params = [];
            for(let key in data){
                params.push(`${key}=${data[key]}`);
            }
            url = url + '?' + params.join('&');
        }
    }
    return fetch(url,{
        ...options
    }).then(res=>{
        return res.json()
    })
}

//封装get请求
request.get = function(url,data={},options={}){
    options.method = 'get';
    return request(url,data,options);
}

//封装post请求
request.post = function(url,data={},options={}){
    options.method = 'post';
    options.body = JSON.stringify(data);
    options.headers = new Headers({
        'Content-Type':'application/json'
    })
    return request(url,data,options);
}

//封装put请求
request.put = function(url,data={},options={}){
    options.method = 'put';
    options.body = JSON.stringify(data);
    options.headers = new Headers({
        'Content-Type':'application/json'
    })
    return request(url,data,options);
}

//封装delete请求
request.delete = function(url,data={},options={}){
    options.method = 'delete';
    options.body = JSON.stringify(data);
    options.headers = new Headers({
        'Content-Type':'application/json'
    })
    return request(url,data,options);
}

export default request;


