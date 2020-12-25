import React, { useEffect, useState ,useMemo, useCallback } from 'react';

import LoginMask from '../component/LoginMask';
import FloorCon from '../component/FloorCon';
import {getUser} from '../utils/auth';
import request from '../utils/request';
import '../css/sass/cart.scss';

function Cart(props){
    const [isMask,showMask] = useState(false);
    const [username,setName] = useState(getUser()||'');
    //推荐列表
    const [recommend,setRecommend] = useState([]);
    //当前用户数据
    const [cartData,setCartData] = useState([]);
    //选中列表
    const [checklist,changeCheck] = useState([]);
    //全选
    let [allCheck,setAllCheck] = useState(false);
    //当前商品重量

    //路由拦截
    useEffect(()=>{
        if(!getUser()){
            showMask(true);
        }else{
            showMask(false);
        }
    },[]);

    //请求当前用户的购物车数据
    useMemo(async ()=>{
        // console.log(username);
        let res = await request.get('/cart/usergoods',{
            username,
        });
        // console.log("currentUser=",res);
        //当前用户有数据
        if(res.data.length>0){
            setCartData(res.data[0].goods);
            //存储到本地存储
            localStorage.setItem("cartData",JSON.stringify(res.data[0].goods));
            //刚拿到商品数据，选中状态都为false
            let arr = [];
            // console.log("checklist=",checklist);
            for(let i=0;i<res.data[0].goods.length;i++){
                arr.push(false);
            }
            console.log("arr=",arr);
            changeCheck(arr);
        }
    },[username]);

    //获取推荐列表的数据
    const recommendFn = useEffect(()=>{
        // console.log("cartData.length=",cartData.length);
        if(cartData.length){
            request.get('/goods/partslist',{pageSize:4}).then((res)=>{
                setRecommend(res.data);
            });
        }else{
            request.get('/goods/cakelist',{pageSize:10}).then((res)=>{
                setRecommend(res.data);
            });
        }
    },[cartData]);

    //删除当前商品
    const deleteItem = useCallback((clickItem)=>{
        console.log("deleteitem=",clickItem);
        // console.log("deleteindex=",index);
        //删除数据库和本地存储的当前checkid;
        //1、先修改数据库，确定数据库修改成功了再修改本地存储
        let localData = JSON.parse(localStorage.getItem("cartData"));
        // console.log("localData=",localData);
        let newData = localData.filter((localItem)=>localItem.checkid != clickItem.checkid);
        // console.log("newData=",newData);
        request.put('/cart/delete/'+username,{goods:newData}).then(data=>{
            // console.log("newSql=",data);
            if(data.flag){ //数据库删除成功
                //更改本地存储的数据
                setCartData(newData);
                localStorage.setItem("cartData",JSON.stringify(newData));
            }
        })
    },[cartData]);

    //单选
    const singleChoose = useCallback((currentIdx)=>{
        // let isAllPick = checklists.every(good=>good)
        // changePick(isAllPick)
        if(checklist.length){
            checklist[currentIdx] = !checklist[currentIdx];
            changeCheck([...checklist]);
            //判断全选
            console.log("checklist=",checklist);
            let isAllCheck = checklist.every(status=>status);
            console.log("isAllCheck=",isAllCheck);
            setAllCheck(isAllCheck);
        }
    },[checklist,allCheck]);

    //全选
    const changeAllCheck = useCallback(()=>{
        if(checklist.length){
            //先改变每个商品的状态
            let newCheck = [];
            for(let i=0;i<checklist.length;i++){
                newCheck.push(!allCheck);
            }
            changeCheck(newCheck);
            //再改变全选按钮的状态
            allCheck = !allCheck
            setAllCheck(allCheck);
        }
    },[checklist,allCheck]);
    return (
        <div className="cart-box">
            {/* 渲染结构：分成当前用户购物车有数据和无数据 */}
            {
                JSON.parse(localStorage.getItem("cartData")).length?
                <div className="cart-con">{/* 当前用户购物车有数据 */}
                     {/* {cartShow ?<CartMask showCart={cartShow} showData={goodsData} changeShow={changeShow}
                     changeGoods={changeGoods}
                     changeCheck={changeCheck} username={username}
                     changePick={changePick}
                     />:''} */}
                    <ul className = "cart-con-list">
                        {
                            cartData.map((good,goodIndex)=>{
                                return (
                                    <li key={goodIndex}>
                                        <div className="cart-item-con">
                                            <label htmlFor={"good"+good.id}>
                                            <input type="checkbox" 
                                            id={"good"+good.id}
                                            /* 或者加一个data-id */ 
                                            checked={checklist[goodIndex]||false} 
                                            onChange={singleChoose.bind(null,goodIndex)}
                                            /></label>

                                           <img src={good.img}/>
                                           <div className="cart-item-content-box">
                                               <div className="cart-item-content-top">
                                               <div className="cart-item-content-title">
                                                    <p className="chinese">{good.name}</p>
                                                    <p className="french">{good.french}</p>
                                               </div>
                                               <div className="cart-item-content-edit">编辑</div>
                                               </div>
                                                <div className="cart-item-content-btm">
                                                    <span className="cart-item-price">￥{good.pprice || good.price}</span>
                                                    <span className="cart-item-wight">
                                                        {
                                                            good.list.map(item=>{
                                                                if(item.id === good.checkid){
                                                                    return `${item.spec} (${item.weight}) x ${good.num}`
                                                                };
                                                            })
                                                        }
                                                    </span>
                                                </div>
                                                
                                           </div>
                                           <div className="delete-item" 
                                           onClick={deleteItem.bind(null,good)}>删除</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    <div className="recommend-parts">
                        <h2 className="recommend_goods">
                            加购配件
                        </h2>
                        <ul className="recommend_list">
                            {
                                recommend.map(recom=>{
                                    return (
                                        <li key={recom.id}>
                                            <figure className="recommend_item" >
                                                <img src={recom.img} alt=""/>
                                                <figcaption>
                                    <p className="recommend_item_tilte">{recom.name}</p>
                                    <p className="recommend_item_price">￥{recom.pprice||recom.price}</p>
                                                    <span className="recommend_item_add"/*  onClick={
                                                        (e)=>{
                                                            e.stopPropagation()
                                                            changedata(good);
                                                            changeShow(!cartShow);
                                                        }
                                                    } */></span>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                        <div className="cart-pay-footer">
                            <label htmlFor="total">
                            <input type="checkbox" id="total"
                            checked={allCheck}
                            onChange={changeAllCheck} 
                            />全选
                            </label>
                        <span className="totalPrice">合计：￥</span>
                        <span className="pay" >去结算</span>
                        </div>
                    </div>
                   
                </div>

                :
                <div className="no-cart-con">{/*无数据时结构*/}
                {/* {cartShow ?
                <CartMask showCart={cartShow} showData={goodsData} changeShow={changeShow} changeGoods={changeGoods}
                changeCheckLists={changeCheckLists} username={username} changePick={changePick}
                />:''} */}
                <div className="no-cart-con-pic">
                    <p>
                        <span>您的购物车还是空的，</span>
                        <span className="tohome"
                        onClick={()=>{
                            props.history.push('/home')
                        }}
                        >赶紧行动吧！</span>
                    </p>
                </div>
                <div className="no-cart-list">
                    <h2 className="recommend_goods">
                        为您推荐
                    </h2>
                    <ul className="recommend_list">
                        {
                            <FloorCon conData={recommend}/>
                        }
                    </ul>
                </div>
                <div className="cart-footer">
                    <div className="gotohome"
                        onClick={()=>{
                            props.history.push('/home')
                        }}
                        >再逛逛</div>
                    </div>
                </div>
            }

            {isMask?<LoginMask isMask={isMask} showMask={showMask}/>:''}
        </div>
    )
}

export default Cart;