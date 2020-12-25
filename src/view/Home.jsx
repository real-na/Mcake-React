import React,{useEffect,useState} from 'react';

//接口文件
import request from '../utils/request';
//组件
import Banner from '../component/Home/Banner';
import Floor from '../component/Home/Floor';
import Division from '../component/Home/Division';
//图片
import footerLogo from '../assets/images/Home/logo2.png';
import weibo from '../assets/images/Home/weibo.png';
import weixin from '../assets/images/Home/weixin.png';
import wx_code from '../assets/images/Home/wx_code.jpg';

function Home(){
    //请求数据
    const [homeData,changeHome] = useState([]);
    const [floorData,changeFloor] = useState([]);

useEffect(function(){
    request.get('/goods/homegoods').then((res)=>{
        // console.log("homeData",res.data[0].list);
        changeHome(res.data[0].list);
        //楼层数据
        const newFloor = res.data[0].list.filter(item=>item.type === 2);
        changeFloor(newFloor);
    })
},[]);

    return (
        <div>
            {/* 轮播图 */}
            {/*console.log(homeData,222)*/}
            <Banner bannerData={homeData.length?homeData[0].source.adsense:[]} auto={true}/>
            {/* 产品楼层 */}
            <Floor data = {floorData}/>
            {/* 银行专区 */}
            <Division data = {homeData.length?homeData[4]:[]}/>

            {/* 底部 */}
            <ul className="homeBottom">
                <li className="footerLogo">
                    <img src={footerLogo} alt="" />
                </li>
                <li className="wxCode">
                    <img src={wx_code} alt=""/>
                </li>
                <li className="chat">
                    <img src={weibo} alt=""/>
                    <img src={weixin} alt=""/>
                </li>
                <li className="copyRight">
                    <p>Copyright © 2012-2020 上海卡法电子商务有限公司 版权所有 </p>
                    <p>沪ICP备12022075号 沪公网安备31010702005582号</p>
                </li>
            </ul>

        </div>
    )
}

export default Home;