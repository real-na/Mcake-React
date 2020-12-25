// export function searchFormat(params){
//     let reg = /\??([a-z]+)=([0-9a-z\.-]+)&?/ig;
//     let obj={};
//     params.replace(reg,(match,p1,p2)=>{
        
//         obj[p1] = p2;
//     });
//     return obj;
// }
export function searchFormat(search){
    if(search.startsWith('?')){
        search = search.slice(1);
    }
    const params = search.split('&').reduce((obj,item)=>{
        const arr = item.split('=');
        obj[arr[0]] = arr[1];
        return obj;
    },{});
    return params;
}

export function throttle(callback,duration=200){
    let lasttime = new Date().getTime();
    return function(){
        let nowtime = Date.now();
        if(nowtime - lasttime > duration){
            lasttime = nowtime;
            callback();
        }
    }
}