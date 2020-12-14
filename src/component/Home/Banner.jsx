import React from 'react';

// swiper轮播图
import SwiperCore, { Pagination ,Autoplay ,A11y} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

//样式
import "../../css/sass/home.scss";

SwiperCore.use([ Pagination ,Autoplay,A11y]);
function Banner(props){
    // console.log("Bannerprops",props.bannerData);
    // const [list,changeList] = useState([]);
    // useEffect(()=>{
    //     changeList(props.bannerData)
    // },[props.bannerData])
    return (
        <div className="home-banner">
            <Swiper
            initialSlide={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={true}
            >
            {
                props.bannerData.map(item=>(
                    <SwiperSlide key={item.title}>
                        <img src={item.img} alt={item.title}/>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    )
}

export default Banner;