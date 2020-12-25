import React, { useEffect, useState ,useCallback}  from 'react';

import '../css/sass/reg.scss';
import request from '../utils/request';
import CryptoJS from 'crypto-js';
import { Toast } from 'antd-mobile';

function Reg(props){
    const [tel,setTel] = useState('');
    const [name,setName] = useState('');
    const [psw,setPsw] = useState('');
    const [shaPsw,setShaPsw] = useState('');
    const [againPsw,setAgainPsw] = useState('');  
    const [agree,setAgree] = useState(true); 
    //提示
    const [pswRes,changePswRes]=useState(false);
    const [nameRes,changeNameRes]=useState(false);    

    const regName = /^[\da-zA-Z_\u4e00-\u9fa5]{6,14}$/;
    const regTel = /^[1]([3-9])[0-9]{9}$/;
    const regPsw= /^[A-Za-z\d.!%*#?]{6,18}$/;
    const length = name.replace(/[\u4e00-\u9fa5]/g,"aaa");//一个汉字表示三个字符

    //用户名正则验证
    useEffect(()=>{
        //为空的时候不验证
        if(!name){
            changeNameRes(false);
        }else{
            changeNameRes(regName.test(length));
        }
    },[name]);
    /* const iptName = useCallback((nameVal)=>{
        setName(nameVal);
        if(!name){
            console.log(111);
            changeNameRes(false);
        }else{
            changeNameRes(regName.test(length));
        }
    },[name]) */
    //密码正则验证
    useEffect(()=>{
        psw?
        changePswRes(regPsw.test(psw))
        :changePswRes(false);
    },[psw]);
    
    //点击立即注册的时候验证正则，再发请求
    const nowReg = useCallback(async ()=>{
        // console.log("againPsw=",againPsw);
        // console.log("name=",name);
        // console.log("psw=",psw);
        // console.log("agree=",agree);
        // console.log("tel=",tel);
        if(!regName.test(length)){
            Toast.info('请输入7-14个字符的用户名（中文占三个字符）',1)
        }else if(!regTel.test(tel)){
            Toast.info('请输入正确的手机号',1);
        }else if(!regPsw.test(psw)){
            Toast.info('请输入6-18个字符的密码',1);
        }else if(shaPsw !== againPsw){
            Toast.info('两次输入的密码不一致',1);
        }else if(!agree){
            Toast.info('请阅读并同意《MCAKE购物协议》',1)
        }else{
            //通过验证，发送请求
            let result = await request.post('/users/reg',{
                username:name,
                tel,
                password:shaPsw,
            });
            if(result.flag){
                props.history.replace({
                    pathname:'/login',
                    search:props.location.search,
                    state:{
                        name
                    }
                })
                return
            }else{
                Toast('注册失败，请重新尝试',1)
            }
        }
    },[name,psw,tel,againPsw,agree]);

    return (
        <div className='reg-box'>
            <div className='reg-ipt'>
                <i className="iconfont icon-gezi-copy"></i>
                <input type="text" value={name} placeholder="用户名"
                onChange={(e)=>{
                    /* iptName.call(null,e.currentTarget.value); */
                    setName(e.currentTarget.value);
                }}/>
            </div>
            {nameRes?'':<span>请输入6-14个字符的用户名（中文占两个字符）</span>}
            
            <div className='reg-ipt'>
                <i className="iconfont icon-shouji-copy"></i>
                <input value={tel} type="text" placeholder="手机号码" 
                onChange={(e)=>{
                    setTel(e.currentTarget.value);
                }} />
            </div>

            <div className='reg-ipt'>
                <i className="iconfont icon-suo-copy"></i>
                <input value={psw} type="password"  placeholder="密码" 
                onChange={(e)=>{
                    setPsw(e.currentTarget.value);
                    const password = CryptoJS.SHA256(e.currentTarget.value).toString(); 
                    setShaPsw(password);
                }}/>
            </div>
            {pswRes?'':<span>请输入6-18个字符的密码</span>}
            
            <div className='reg-ipt'>
                <i className="iconfont icon-suo-copy"></i>
                <input type="password" placeholder="密码确认" onChange={(e)=>{
                    const secondPsw = CryptoJS.SHA256(e.currentTarget.value).toString();
                    setAgainPsw(secondPsw);
                }}/>
            </div>
            <div className='reg-agree'>
                <input type='checkbox' defaultChecked={agree} id="agree"/>
                <label htmlFor='agree' 
                onClick={
                    ()=>{setAgree(!agree)
                }}></label>
                <span>同意《MCAKE购物协议》</span>
            </div>
            <p className='gologin'>
                <span onClick={()=>{props.history.push('/login')}}>已有账号，立即登录</span>
            </p>
            
            <button onClick={nowReg}>立即注册</button>
            
        </div>
    )
}

export default Reg;