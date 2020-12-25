import React, { useCallback, useEffect, useState } from 'react';

import '../css/sass/mine.scss';

import LoginMask from '../component/LoginMask';
import {getToken,getUser} from '../utils/auth';

function Mine(){
    const dataList = [{img:"pic pic_3",text:"我的订单"},{img:"pic pic_4",text:"待付款"},
    {img:"pic pic_5",text:"待收货"},
    {img:"pic pic_6",text:"会员等级"},
    {img:"pic pic_7",text:"积分"},
    {img:"pic pic_8",text:"余额"},
    {img:"pic pic_9",text:"红包/优惠券"},
    {img:"pic pic_10",text:"现金卡"},];

    // const [user,setUser] = useState('');

    const [isMask,showMask] = useState(false);
    // setUser('off');
    useEffect(()=>{
        // console.log("cookieUser",getToken());
        //未登录，遮罩层出现，
        if(!getToken()){
            showMask(true);
        }
    },[]);

    //切换账号
    const changeAccout = useCallback(()=>{
        console.log(1);
    },[])
    return (
        <div className="mine">
            <div className="mine-top">
                <div className="user">
                    <div className="user-top">
                        <span className="avatar pic pic_1"></span>
                        <h2 className="account">{getUser()}</h2>
                        <p className="change" onClick={changeAccout}>
                        <span className="pic pic_2"></span>切换账号
                        </p>
                    </div>
                    <ul className="user-bottom">
                        {
                            dataList.map(item=>{
                                return (
                                    <li key={item.text}>
                                        <span className={item.img}></span>
                                        <p>{item.text}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            {
                isMask?<LoginMask isMask={isMask} showMask={showMask}/>:''
            }
            
        </div>
    )
}

export default Mine;