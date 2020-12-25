import React,{useState,useEffect} from 'react';
import {searchFormat} from '../utils';
import request from '../utils/request';

import FloorCon from '../component/FloorCon';

import '../css/sass/list.scss';

function List(props){
    const [listData,changeCake] = useState([]);
    console.log("listprops=",searchFormat(props.location.search));
    const {name,fid} = searchFormat(props.location.search);

    useEffect(async function(){
        let res;
        // console.log("listfid=",fid);
        // console.log("listname=",name);
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
        changeCake(res);
    },[name,fid]);
    
    return (
        <div className="cake-box">
            {
                <FloorCon conData = {listData.data}/>
            }
        </div>
    )
}


export default List;