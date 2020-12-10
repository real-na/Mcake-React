import React from 'react';
import {NavLink} from 'react-router-dom';
import '../css/sass/common.scss';

function Bottom(props){
    const navList = [
       {
            path:'/cake',
            text:'蛋糕'
        },{
            path:'/sanck',
            text:'小食'
        },{
            path:'/cart',
            text:'购物车'
        },
    ];
    console.log(props);
    const showMask = () =>{
        console.log("精选遮罩层");
    }
    return (
        <div className="footerBox">
            <ul className="footer">
            <li onClick={showMask}>精选</li>
                {
                    navList.map(item=>(
                        <li key={item.path}>
                        <NavLink to={null,item.path}
                        activeStyle={{fontWeight:600}}>
                            {item.text}
                        </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Bottom;