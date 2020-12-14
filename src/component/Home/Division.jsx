import React from 'react';
import '../../css/sass/home.scss';

function Division(props){
    const {data} = props;
    return (
        <div>
            <div className="division" key={data.id}>
                <div className="title">{data.title}
                <span>{data.info}</span>
                </div>
                <div className="divisionImg">
                    <img src={data.source?data.source.adsense[0].img:''} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Division;