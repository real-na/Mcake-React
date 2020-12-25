import React , {useState,useContext} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import '../css/sass/common.scss';

import Handpick from '../component/Handpick';
import MyContext from '../context';
function Bottom(props){
    const navList = [
       {
            path:'/cake',
            text:'蛋糕'
        },{
            path:'/snack',
            text:'小食'
        }
    ];
    const {setPage} = useContext(MyContext);
    const [show,changeShow] = useState(false);
    const showHandpick = () =>{
        changeShow(true);
    }
    // console.log("bottom=",props.location.pathname.slice(1));
    return (
        <div className="foot-fix clearfix">
            <div className="footer-box">
            <ul className="footer">
            <li onClick={showHandpick}>精选</li>
                {
                    navList.map(item=>(
                        <li key={item.path}
                        onClick={()=>setPage(1)}>
                        <NavLink to={item.path}
                        activeStyle={{fontWeight:600}}>
                            {item.text}
                        </NavLink>
                        </li>
                    ))
                }
            <li onClick={()=>setPage(1)}>
                <NavLink to={{
                    pathname:'/cart',
                    search:'?source='+props.location.pathname.slice(1)
                }} activeStyle={{fontWeight:600}}>购物车</NavLink>
            </li>
            </ul>
            </div>

            {/* 精选遮罩层 */}
            {
                <div className="handpick-mask" style={{display:show?"block":"none"}}
                onClick={
                    (e) =>{
                        if(e.target.className === "handpick-mask"){
                            changeShow(false);
                        }
                    }
                }>
                <Handpick showHand={show} changeShow={changeShow}/>
                </div>
            }
        </div> 
    )
}

export default withRouter(Bottom);