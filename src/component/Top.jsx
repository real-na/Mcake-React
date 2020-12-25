import React,{useState} from 'react';
import '../css/sass/common.scss';
//图片
import logo from '../assets/images/logo.png';
import back from '../assets/images/zuo.png';
import  dangao from '../assets/images/Mine/dangao.png';
import  dizhi from '../assets/images/Mine/dizhi.png';
import  guanyu from '../assets/images/Mine/guanyu.png';
import  wode from '../assets/images/Mine/wode.png';
import cart from '../assets/images/Mine/cart.png';

function Top(props){
    const {location,history} = props.props;
    // console.log("top=",location.pathname.slice(1));
    const [subNav,changeSub] = useState(false);

    const goto = function(path){
        changeSub(false);
        history.push({
            pathname:path,
            search:'?source='+location.pathname.slice(1)
        })
        // history.push(path);
    }
    return (
        <div className="header-box">
            <div className="fix-box">
            <ul className="header clearfix">
                <li>
                    {
                        (location.pathname === '/cart' || location.pathname.includes('/details') || location.pathname === '/login' || location.pathname === '/reg' || location.pathname === '/mine')?
                        <p className="goback">
                        <img src={back} alt=""/>
                        </p>
                        :<p className="address">
                        <i className="iconfont icon-weizhi"></i>
                        <span>北京市</span>
                        </p>
                    }
                    
                </li>
                <li  onClick={()=>props.props.history.push('/home')}>
                   <img src={logo} alt=""/> 
                </li>
                <li className="search">
                    {
                        (location.pathname === '/cart' || location.pathname.includes('/details') || location.pathname === '/login' || location.pathname === '/reg' || location.pathname === '/mine' )?<p className="goback">
                        <img src={cart} alt=""
                        onClick={goto.bind(null,'/cart')}/>
                        </p>
                        :<i className="iconfont icon-sousuo"></i>
                    }
                    
                </li>
                <li onClick={()=>changeSub(!subNav)}>
                    <i className="iconfont icon-caidan"></i>
                </li>
            </ul>
            <div className="sub-nav" style={{display:subNav?"block":"none"}}
            onClick={(e)=>{
                if(e.target.className === "sub-nav"){
                    changeSub(false);
                }
            }}>
            <ul>
                <li><img src={dangao}></img><span>最新活动</span></li>
                <li><img src={wode} onClick={goto.bind(null,'/mine')}></img><span>个人中心</span></li>
                <li><img src={guanyu}></img><span>关于我们</span></li>
                <li><img src={dizhi}></img><span>配送范围</span></li>
            </ul>
            </div>
            {
                <img src="https://h5.mcake.com/static/images/chirs_2020/snow-1.png" alt="" className="chirms" style={{display:(location.pathname === '/cart' || location.pathname.includes('/details') || location.pathname === '/login' || location.pathname === '/reg' || location.pathname === '/mine')?"none":'block',zIndex:2}}/>
                
            }
            </div>
        </div>
    )
}

export default Top;