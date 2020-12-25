import React,{useState,useEffect,useContext} from 'react';
import request from '../utils/request';
import '../css/sass/list.scss';
import FloorCon from '../component/FloorCon';
import MyContext from '../context';

function Cake(){
    const [snackData,changeSnack] = useState([]);

    const [loading,isLoading] = useState(false);
    const {page,changeIsok} = useContext(MyContext);
    useEffect(async function(){
        isLoading(true);
        let res = await request.get('/goods/snacklist',{
            page,
            pageSize:6
        })
        // console.log("snackData=",res);
        // if(res.flag){
            isLoading(false);
            changeIsok(true);
            changeSnack([...snackData,...res.data]);
        // }
    },[page]);
    return (
        <div className="cake-box">
            {
                <FloorCon conData = {snackData}/>
            }
            <div className='loading' style={{display:loading?'block':'none'}}></div>
        </div>
    )
}


export default Cake;