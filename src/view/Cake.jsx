import React,{useState,useEffect,useContext} from 'react';
import request from '../utils/request';
import '../css/sass/list.scss';
import FloorCon from '../component/FloorCon';
import MyContext from '../context';

function Cake(){
    const [cakeData,changeCake] = useState([]);

    const {page,changeIsok} = useContext(MyContext);

    useEffect(async function(){
        let res = await request.get('/goods/cakelist',{
            page,
            pageSize:6
        });
        if(res.flag){
            // console.log("cakeData=",res);
            changeCake([...cakeData,...res.data]);
            changeIsok(true);
        }
    },[page]);
    return (
        <div className="cake-box">
            {
                <FloorCon conData = {cakeData}/>
            }
        </div>
    )
}


export default Cake;