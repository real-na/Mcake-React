import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/sass/list.scss';
import cartIcon from '../assets/images/cart-icon.png';

function FloorCon(props){
    const {conData} = props;
    // console.log(conData);
    return (
        <div>
            <ul className="floorCon">
                {
                    conData?
                    conData.map(goods=>(
                        <li className="conProduct" key={goods.id}>
                            <div className="conImg">
                                <img  onClick={(e)=>{
                                e.stopPropagation()
                                if(goods.bcname==='周边商品'){
                                    props.history.push('/details?'+props.location.pathname+'&snack&'+goods.id)
                                }else if(goods.bcname==='蛋糕'){
                                    props.history.push('/details?'+props.location.pathname+'&cake&'+goods.id)
                                }
                            }} src={goods.img} alt=""/></div>
                            <b>{goods.name}</b>
                            <p>{goods.french}</p>
                            <span>￥{goods.price}</span>
                            <i className="cartIcon" >
                                <img src={cartIcon} alt=""/>
                            </i>
                        </li>
                    )):
                    <React.Fragment></React.Fragment>
                }
            </ul>
        </div>
    )
}

FloorCon = withRouter(FloorCon);
export default FloorCon;