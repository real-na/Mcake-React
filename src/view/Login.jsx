import React, { useEffect, useState ,useCallback} from 'react';
import '../css/sass/login.scss';
import request from '../utils/request';

import { Toast } from 'antd-mobile';
import {setToken,setUser} from '../utils/auth';
import {searchFormat} from '../utils';

import CryptoJS from 'crypto-js';

function Login(props){
    const [svgCode,setSvg] = useState('');
    const [name,setName] = useState(props.location.state?props.location.state.name:'');
    const [psw,setPsw] = useState('');
    const [code,setCode] = useState(false);

    //图片验证码
    useEffect(()=>{
        request.get('/users/vcode').then((res)=>{
            setSvg(res.data);
        })
    },[]);
    const changeSvg = useCallback(()=>{
        request.get('/users/vcode').then((res)=>{
            setSvg(res.data);
        })
    },[svgCode]);

    //图片验证码验证
    const checkCode = useCallback(async (val)=>{
        let res = await request.post('/users/checkcode',{
            vcode:val
        });
        setCode(res.flag);
    },[]);
    const goto = (path) =>{
        //拼接页面来源,注册好账号登录成功后可以回到来的界面
        props.history.push(path + props.location.search);
    }

    const checkItem = useCallback(()=>{
        // console.log("name=",name);
        // console.log("psw=",psw);
        // console.log("code=",code);
        if(code){
            request.get('/users/login',{username:name,password:psw}).then((res)=>{
            if(!res.flag){
                Toast.info('用户名或密码不正确');
            }else{ //登录成功
                setToken(res.token);
                setUser(res.username);
                const {source} = searchFormat(props.location.search);
                props.history.push('/'+source)
            }
            })
        }else{
            Toast.info('图片验证码不正确');
        }
        
    },[name,psw,code])

    return (
        <div className="login-box">
            <h2>账号密码登录</h2>
            <div className='login-ipt'>
                <i className="iconfont icon-shouji-copy"></i>
                <input type="text" placeholder="用户名/手机"
                value={name}
                onChange={(e)=>{
                    setName(e.currentTarget.value);
                }}/>
            </div>
            <div className="login-ipt ipt-code">
                <i className="iconfont icon-gezi-copy"></i>
                <input type="text" placeholder="图片验证码"
                onChange={(e)=>checkCode.call(null,e.currentTarget.value)}/>
                {
                    svgCode?
                    (()=>{
                        return  <div className="img-code"
                        dangerouslySetInnerHTML={{__html:svgCode}}
                        onClick={changeSvg}>
                        </div>
                    })():''
                }
               
            </div>
            <div className='login-ipt'>
                <i className="iconfont icon-suo-copy"></i>
                <input type="password" placeholder="密码"
                onChange={(e)=>{
                    const password = CryptoJS.SHA256(e.currentTarget.value).toString() ; 
                    setPsw(password);
                }}/>
            </div>
            <div className='now-reg'>
                <span onClick={goto.bind(null,'/reg')}>立即注册</span>   
            </div>

            <div className="other-way">
                <p>其他登录方式</p>
                <p><i className="iconfont icon-zhifubao"></i>
                {/* <img src={weibo}></img> */}
                <i className="iconfont icon-weibo-copy"></i></p>
                
            </div >
            <button onClick={checkItem}>立即登录</button>
        </div>
    )
}
export default Login;