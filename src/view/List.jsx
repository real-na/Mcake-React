import React,{useState,useEffect} from 'react';
import {searchFormat} from '../utils';
import request from '../utils/request';

import FloorCon from '../component/FloorCon';

import '../css/sass/list.scss';

function List(props){
    const [listData,changeCake] = useState([]);
    
    const {name,fid} = searchFormat(props.location.search);

    useEffect(async function(){
        let res;
        if(fid){
            res = await request.get('/goods/regfind/',{fid});
        }else{
            if(name === 'parts'){
                res = await request.get('/goods/partslist');
            }else{
                res = await request.get('/goods/regfind/',{
                    fname:name,
                });
            }
        }
        // console.log(res);
        changeCake(res);
    },[name]);
    
    return (
        <div className="cake-box">
            {
                <FloorCon conData = {listData.data}/>
            }
        </div>
    )
}


export default List;