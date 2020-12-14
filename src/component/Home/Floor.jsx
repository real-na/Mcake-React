import React from 'react';
import {withRouter} from 'react-router-dom';

import titleImg from '../../assets/images/Home/icon_cj.png';
import "../../css/sass/list.scss";
import FloorCon from '../FloorCon';

function Floor(props){
    // console.log("floorprops=",props.data);
    return (
        <div className="floor-box">
            {
                props.data.map(item=>(
                    <div className="floor" key={item.id}>
                        <div className="title">
                            <img src={titleImg} alt=""/>
                            <div className="titleCon">
                                <p className="cname">{item.title}</p>
                                <p className="ename">{item.info}</p>
                            </div>
                            <div className="titleAlias">
                                {item.alias}
                            </div>
                        </div>
                        <div className="bigImg">
                            <img src={item.source.adsense[0].img} alt=""/>
                        </div>
                        <FloorCon conData = {item.source.goods}/>
                    </div>
                ))
            }
        </div>
    )
}

Floor = withRouter(Floor);
export default Floor;