import React,{useCallback, useEffect,useRef} from 'react';
import { withRouter } from 'react-router-dom';
import {searchFormat} from '../utils';
import '../css/sass/loginMask.scss';

function LoginMask(props){
    const {isMask,showMask,history,location} = props;

    const myRef = useRef(null);
    useEffect(()=>{
        if(isMask){
            myRef.current.style.transform = "scale(1)";
        }else{
            myRef.current.style.transform = "scale(0)";
        }
    },[isMask]);

    const cancelLogin = useCallback(()=>{
        //取消登录，跳回来时的界面
        const {source} = searchFormat(location.search);
        
        if(!source){
            history.push(location.pathname+'');
        }else{
            history.push('/'+source);
        }
        showMask(false);
    },[]);

    const nowLogin = useCallback(()=>{
        history.push({
            pathname:'/login',
            search:'?source='+location.pathname.slice(1)
        });
        showMask(false);
    },[]);

    return (
        <div className="login-mask">
            <div className="mask-con" ref={myRef}>
                <h4>温馨提示</h4>
                <p className='mask-ti'>您需要先登录才能继续您的操作</p>
                <p className='mask-btn'>
                    <span onClick={cancelLogin}>以后再说</span>
                    <span onClick={nowLogin}>立即登录</span>
                </p>
            </div>
        </div>
    )
}

export default withRouter(LoginMask);