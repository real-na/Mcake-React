import React,{useContext,useState} from 'react';
import {withRouter} from 'react-router-dom';
import '../css/sass/list.scss';
import cartIcon from '../assets/images/cart-icon.png';
import MyContext from '../context';
import LoginMask from './LoginMask';

//购物车遮罩层组件
import CartShow from './CartShow';

function FloorCon(props){
    const {conData} = props;
    // console.log(conData);
    const {setPage} = useContext(MyContext);
    //购物车遮罩层
    const [showCart,changeShow] = useState(false);
    //当前点击的商品数据
    const [currentgoods,changeCurrent] = useState(null);

    //加入购物车判断是否登录
    const [isLogin,showLogin] = useState(false);
    return (
        <div>
            <ul className="floorCon">
                {
                    conData?
                    conData.map(goods=>(
                        <li className="conProduct" key={goods.id}>
                            <div className="conImg">
                                <img  onClick={(e)=>{
                                e.stopPropagation();
                                setPage(1);
                                if(goods.bcname==='周边商品'){
                                    props.history.push('/details?bcname=snack&id='+goods.id)
                                }else if(goods.bcname==='蛋糕'){
                                    props.history.push('/details?bcname=cake&id='+goods.id)
                                }else if(goods.bcname === '商品配件'){
                                    props.history.push('/details?bcname=parts&id='+goods.id)
                                }
                                
                            }} src={goods.img} alt=""/></div>
                            <b>{goods.name}</b>
                            <p>{goods.french}</p>
                            <span>￥{goods.price}</span>
                            <i className="cartIcon" 
                            onClick={()=>{
                                changeShow(true);
                                changeCurrent(goods);
                            }}>
                                <img src={cartIcon} alt=""/>
                            </i>
                        </li>
                       
                    )):
                    <React.Fragment></React.Fragment>
                }
            </ul>
            {
                showCart?<CartShow isShow={showCart} changeShow={changeShow} showData={currentgoods} showLogin={showLogin}/>:''
            }
            {
                isLogin?<LoginMask isMask={isLogin} showMask={showLogin}/>:''
            }
        </div>
    )
}

FloorCon = withRouter(FloorCon);
export default FloorCon;