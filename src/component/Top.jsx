import React from 'react';
import '../css/sass/common.scss';
//图片
import logo from '../assets/images/logo.png';
import back from '../assets/images/zuo.png'

function Top(props){
    const {pathname} = props.props.location;
    // console.log("Headerprops",pathname);
    
    return (
        <div className="header-box">
            <ul className="header clearfix">
                <li>
                    {
                        (pathname === '/cart' || pathname === '/details' || pathname === '/login' || pathname === '/reg')?
                        <p className="goback">
                        <img src={back} alt=""/>
                        </p>
                        :<p className="address">
                        <i className="iconfont icon-weizhi"></i>
                        <span>北京市测试</span>
                        </p>
                    }
                    
                </li>
                <li>
                   <img src={logo} alt=""/> 
                </li>
                <li className="search">
                    <i className="iconfont icon-sousuo"></i>
                </li>
                <li>
                    <i className="iconfont icon-caidan"></i>
                </li>
            </ul>
            <img src="https://h5.mcake.com/static/images/chirs_2020/snow-1.png" alt="" className="chirms"/>
        </div>
    )
}

export default Top;