import React from 'react';

function ProSize(props){
    const {sizeData} = props;
    // console.log("sizeData=",sizeData);
    return (
        <div className="pro-con">
            {sizeData?<ul className="cur-con">
                    <li className="cur-price">￥<span>{sizeData.pprice}</span>
                    </li>
                    <li className="cur-guige">
                        <p><i className="iconfont icon-shizhong-copy"></i>
                            {sizeData.ahead}</p>
                        <p><i className="iconfont icon-biaoqian-copy "></i>
                            {sizeData.size}</p>
                        <p><i className="iconfont icon-dangao-copy "></i>
                            {sizeData.spec}</p>
                        {Object.prototype.toString.call(sizeData.fittings) === "[object Object]" ? 
                        <p>
                            <i className="iconfont icon-canju-copy "></i>
                            {sizeData.fittings['51'].name}X{sizeData.fittings['51'].num}</p>
                        :''}
                        
                    </li>
                </ul>:''}
        </div>
    )
}

export default ProSize;