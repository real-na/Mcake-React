import React,{useState,useEffect,useCallback} from 'react';
import {withRouter} from 'react-router-dom';
import {searchFormat} from '../utils';
import {request} from '../utils/request';

// 组件
import Banner from '../component/Home/Banner';
import ProSize from '../component/Details/ProSize';
import GoodDes from '../component/Details/GoodDes';
import { Tabs , Toast } from 'antd-mobile';
import {getUser} from '../utils/auth';
import LoginMask from '../component/LoginMask';

//样式
import '../css/sass/details.scss';

// 促销数据
const promotion = [
    {"id":1212,"type":7,"channelStr":"","ptype":2,"title":"买蛋糕可至购物车参加优惠换购","remark":"买蛋糕可至购物车参加优惠换购","tag":"换购","recommend":0},{"id":1891,"type":2,"channelStr":"1035","ptype":2,"title":"2020年11月会员日","remark":"限时限量特价","tag":"特价","recommend":0},{"id":1839,"type":1,"channelStr":"1112","ptype":2,"title":"2020年中秋节礼品卡兑换","remark":"2020年中秋节礼品卡兑换","tag":"立减","recommend":1},{"id":1895,"type":2,"channelStr":"336","ptype":1,"title":"内部员工订单免运费","remark":"内部员工订单免运费","tag":"免邮","recommend":0},{"id":1874,"type":8,"channelStr":"","ptype":1,"title":"9周年庆","remark":"限量赠礼","tag":"赠品","recommend":0}
];

function Details(props){
    const [detailsData,setDetails] = useState(null); //整个详情页数据
    const [bannerData,setBanner] = useState(null); //轮播图数据
    const [currentSku,setSku] = useState(null); 
    const [size,setSize] = useState(null);   //当前尺寸
    const [label,setLabel] = useState(null); //小标签
    const [goodDes,setGoodDes] = useState(null); //商品详情
    let [num,setNum] = useState(0);
    const [isMask,showMask] = useState(false);
    const {bcname,id} = searchFormat(props.location.search);
    let user = getUser();

    const tabs = [
        { title: '商品详情' },
        { title: '商品点评' },
    ];  

    /* 获取详情页数据 */
    useEffect(async ()=>{
        // console.log(props.location.search);
        const {bcname,id} = searchFormat(props.location.search);
        let res = await request.get('/goods/cakesearch',{
            bcname,
            id:id-0,
        });
        console.log("detailsRes=",res);
        setDetails(res.data[0]);
        // 设置初始sku
        setSku(res.data[0].sku);
        setSize(res.data[0]); //要设置默认显示的规格
    },[]);
    // console.log("sizeout=",size);

    /* 设置轮播图数据 */
    useEffect(function(){        
        if(detailsData){           
            let newBanner = [];
            detailsData.pic.list.forEach(item=>{
                newBanner.push(detailsData.pic.url+item.m);
            });
            setBanner(newBanner);
            //setBanner是异步的
        }
    },[detailsData]);

    /* 点击改变可选规格 */
    let changeSku = useCallback((goods)=>{
        console.log("goods=",goods);
        setSku(goods.sku);
        setSize(goods);
    },[currentSku]);
    
    /* 不变的部分数据 */
    //小标签
    useEffect(()=>{
        console.log("detailsData=",detailsData);
        if(detailsData){
            detailsData.fname && setLabel(detailsData.fname.split(','));
        }
    },[detailsData]);
    // console.log("detailsData=",detailsData);

    /* 商品详情 */
    useEffect(()=>{
        let goodDesData = [];
        if(detailsData){
            goodDesData.push(detailsData.basic.list);
            goodDesData.push(detailsData.mater);
            goodDesData.push(detailsData.details);
            setGoodDes(goodDesData);
        }
    },[detailsData]);

    /* 加入购物车 */
    const addCar = useCallback(async ()=>{
        // console.log("currentSku=",currentSku);
        // console.log("size=",size);
        // console.log("bcname=",bcname);
        // console.log("user=",getUser());
        if(!user){
            showMask(true);
        }else{
            let res = await request.put('/cart/push/'+getUser(),{
                id,
                checkid:size.id,
                bcname,
                num,
            });
            if(res.code === 200){
                // console.log("addcarRes=",res);
                Toast.info('加入购物车成功',2);
            }
        }
    },[size,setNum]);

    const nowBuy = useCallback(async ()=>{
        // console.log("currentSku=",currentSku);
        // console.log("size=",size);
        // console.log("bcname=",bcname);
        // console.log("user=",getUser());
        console.log("num1=",num);
        // setTimeout(async ()=>{
            let res = await request.put('/cart/push/'+getUser(),{
                id,
                checkid:size.id,
                bcname,
                num,
            });
            if(res.code === 200){
                console.log("nowBuy=",res);
                Toast.info('加入购物车成功',2);
                props.history.push('/cart');
            }
        // },2000)
    },[size,setNum]);
    return (
        <div className="details-box">
            {/* 轮播图 */}
            <Banner bannerData={bannerData} auto={true}/>
            {/* 可选规格 */}
            <div className="details-main">
                {
                    (detailsData&&detailsData.list.length>1)?
                    <ul className="pro-tab">
                        {
                            detailsData.list.map(item=>(
                                <li key={item.id}
                            className={item.sku===currentSku?'activeWeight':''}
                            onClick={changeSku.bind(null,item)}
                            >
                                    <p>{item.spec}</p>
                                    <p>({item.weight})</p>
                                    <span>{item.edible}</span>
                            </li>
                            ))
                        }
                    </ul>:<React.Fragment></React.Fragment>
                }
                <ProSize sizeData={size}/>

                {/* 不变的部分 */}
                <div className="noChange">
                    {label?<div className="good-label floor">
                    <i className="iconfont icon-biaoqian-copy "></i>
                        {label.map((item,index)=>(
                            <span key={index}>{item}</span>
                        ))}

                    </div>:''}
                    
                    <div className="tips floor">
                        <span>!</span>若不及时食用，请放置0-10℃冷藏
                    </div>
                    {detailsData? <div className="describe">
                        <p>{detailsData.brief}</p>
                        <p>{detailsData.frenchBrief}</p>
                    </div>:""}
                
                    <div className="promotion floor">
                    <span>促销</span>
                    <ul>
                        {
                            promotion.map(item=>(
                                <li key={item.id}>
                                    <i>{item.tag}</i>
                                 {item.title}</li>
                            ))
                        }
                    </ul>
                    <span>详情 &gt;</span>
                </div>
                </div>

            </div>

            {/* 商品详情和商品点评 */}
            <div className="desAndCom">
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}
                tabBarInactiveTextColor="#8d8d8d"
                tabBarActiveTextColor="#000"
                tabBarUnderlineStyle={{borderColor:"#ffe32a"}}
                >
                    <div className="des-item goods-des">
                        {/* 商品详情组件 */}
                        <GoodDes data={goodDes}/>
                    </div>
                    <div className="des-item goods-com">
                        {/* 商品评论 */}
                    </div>
                </Tabs>
            </div>
            {/* 加入购物车和立即购买按钮 */}
            <div className="operate-box">
                <div className='details-operate'>
                    <span onClick={()=>{
                        setNum(num++);
                        addCar();
                    }}>加入购物车</span>
                    <span onClick={()=>{
                        setNum(num++);
                        nowBuy();
                    }}>立即购买</span>
                </div>
            </div>
            {
                isMask?<LoginMask isMask={isMask} showMask={showMask}/>:''
            }
        </div>
    )
}

export default withRouter(Details);