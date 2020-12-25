import React,{useState,useCallback,useEffect,useRef} from 'react';

import '../css/sass/cartShow.scss';
import request from '../utils/request';
import {Toast} from 'antd-mobile';
import {getUser} from '../utils/auth';

function CartMask(props){
    const {showData,isShow,changeShow,showLogin} = props;
    //默认数据的index
    let defaultIdx = 0;
    let defaultGuige = '';
    //设置默认的index和规格
    // const curList = {};
    showData.list.forEach((item,index)=>{
        if(item.id === showData.id){
            defaultIdx = index;
            // curList = item;
            //默认的规格
            defaultGuige = `${item.spec} (${item.weight}) -${item.edible}`;
        }
    });
    
    //选择重量的下拉菜单
    const [weightMenu,changeMenu] = useState(false);
    //数量
    const [qty,changeQty] = useState(1);
    //当前的规格
    const [currentweight,changeWeight] = useState(defaultGuige);
    //当前选择的数据
    // const [currentList,changeList] = useState(curList);
    //当前的下标
    const [currentIdx,changeIdx] = useState(defaultIdx);

    //获取遮罩层内容区域元素做动画效果
    const myref = useRef(null);
    useEffect(()=>{
        if(isShow){
            myref.current.style.top = '200px';
        }else{
            myref.current.style.top = 0;
        }
    })
    console.log("showData=",showData);
    
    //在下拉列表选择不同的重量
    const changeWeightFn = useCallback((guige,idx)=>{
        // changeList(guige);
        let currentGuige = `${guige.spec} (${guige.weight}) -${guige.edible}`;
        changeWeight(currentGuige);
        changeIdx(idx);
        changeMenu(false);
    },[currentIdx]);

    const sureAddCar = async () => {
        console.log("qty=",qty);
        console.log("currentIdx",currentIdx);
        const username = getUser();
        console.log("username=",username);
        if(username){
            showLogin(false);
            let bcname = '';
            if(showData.bcname === '蛋糕'){
                bcname = 'cake';
            }else if(showData.bcname === '商品配件'){
                bcname = 'parts';
            }else if(showData.bcname === '周边商品'){
                bcname = 'snack';
            };
            let res = await request.put('/cart/push/'+username,{
                id:showData.id,
                checkid:showData.list[currentIdx].id,
                bcname,
                num:qty,
            });
            if(res.code === 200){
                console.log("addcarRes=",res);
                Toast.info('加入购物车成功',2);
            }
        }else{
            changeShow(false);
            showLogin(true);
        }
    }

    return (
        <div className="cartMask"
        onClick = {(e)=>{
            if(['cartMask','closeBtn','cancel'].includes(e.target.className)){
                changeShow(false);
            };
        }}>
            <div className="mask-con" ref={myref}>
                <ul>
                    <li className="contentDesc">
                        <img src={showData.img} alt=""/>
                        <div className="disc">
                            <h5>{showData.name}</h5>
                            <p>{showData.french}</p>
                            <h5>￥{showData.list[currentIdx].pprice}</h5>
                        </div>
                        <span className="closeBtn">✕</span>
                    </li>
                    <li className="specification choose">
                        <h4>规格选择</h4>
                        <div className="chooseSpecify">
                            <span
                            onClick={()=>{
                                changeMenu(!weightMenu)
                            }}>
                                {currentweight}∨
                            </span>
                            {
                                weightMenu?
                                (<ul className="chooseWeight">
                                {
                                    showData.list.map((item,index)=>(
                                        <li key={item.id}
                                        className={index===currentIdx?"activeWeight":''}
                                        onClick={
                                            changeWeightFn.bind(null,item,index)
                                        }
                                        >
                                            {item.spec}（{item.weight}）  - {item.edible}
                                        </li>
                                    ))
                                }
                                </ul>):'' 
                            }
                        </div>
                    </li>
                    <li  className="number choose">
                        <h4>数量选择</h4>
                        <div className="chooseQty">
                            <input type="button" value="-"
                            onClick={()=>{
                                if(qty>1)changeQty(qty-1);
                            }} />
                            <input type="text" id="" value={qty}
                            onChange={(e)=>{
                                changeQty(e.currentTarget.value);
                            }}/>
                            <input type="button" value="+"
                            onClick={()=>{
                                changeQty(qty+1);
                            }}/>
                        </div>
                    </li>
                </ul>

                <div className="sureBtn">
                    <button className="cancel">取消</button>
                    <button className="sure"
                    onClick={
                        sureAddCar
                    }
                    >确定</button>
                </div>
            </div>
        </div>
    )
}

export default CartMask;