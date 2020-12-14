import React ,{useState,useEffect,useRef,useCallback} from "react";
import '../css/sass/common.scss';
import {withRouter} from 'react-router-dom';
//图片
import sjt from '../assets/images/sjt.png';
import yjt from '../assets/images/yjt.png';
function Handpick(props){
    //遮罩层左边慢慢出来的效果
    const {showHand,changeShow} = props;
    const myel = useRef(null);
    useEffect(function(){
        if(showHand){
            myel.current.style.left = 0;
        }else{
            myel.current.style.left = '-51%';
        }
    },[showHand]);

    //口味筛选和场景筛选的二级菜单
    const [tasteList,changeTaste] = useState(
        [{name:'拿破仑',icon:'elf_01'},{name:'奶油',icon:'elf_02'},{name:'慕斯',icon:'elf_03'},{name:'芝士',icon:'elf_04'},{name:'巧克力',icon:'elf_05'},{name:'咖啡',icon:'elf_06'},{name:'坚果',icon:'elf_07'},{name:'水果',icon:'elf_08'},{name:'冰淇淋',icon:'elf_09'}]
    );
    const [sceneList,changeScene] = useState(
        [{name:'生日',icon:'iconfont icon-shengri',fid:34},{name:'聚会',icon:'iconfont icon-qingdianhejuhui-',fid:35},{name:'情侣',icon:'iconfont icon-xin',fid:36},{name:'儿童',icon:'iconfont icon-ertong',fid:37},{name:'长辈',icon:'iconfont icon-changbei',fid:38},{name:'下午茶',icon:'iconfont icon-icon-test',fid:39}]
    );

    const [showTaste,changeShowT] = useState(false);
    const [showScene,changeShowS] = useState(false);

    const sjtRef1 = useRef(null);
    const sjtRef2 = useRef(null);

    let FunShowT = useCallback(function(e){
        e = e || window.event;
        changeShowT(!showTaste);
        if(!showTaste){
            sjtRef1.current.style.transform = 'rotate(180deg)';
        }else{
            sjtRef1.current.style.transform = 'none';
        }
    },[showTaste]);

    let FunShowS = useCallback(function(e){
        e = e || window.event;
        changeShowS(!showScene);
        if(!showScene){
            sjtRef2.current.style.transform = 'rotate(180deg)';
        }else{
            sjtRef2.current.style.transform = 'rotate(0)';
        }
    },[showScene]);

    //点击跳转其他页面
    const goto = (path) =>{
        props.history.replace(path);
        changeShow(false);
    }

    return (
        <div className="handpick-box" ref={myel}>
            <div className="handpink-con">
                <div className="con-one"
                onClick={goto.bind(null,'/cake')}>
                    <span>所有蛋糕</span>
                    <i className="num">32</i>
                </div>
                <div className="con-one"
                onClick={FunShowT}>
                    <span>口味筛选</span>
                    <img src={sjt} alt="" ref={sjtRef1}/>
                </div>
                {
                    showTaste?
                    <ul className="con-two clearfix">
                    {tasteList.map(item=>(
                        <li key={item.name}
                        onClick={goto.bind(null,'/list/?name='+item.name)}>
                            <i id="tastei" className={item.icon}></i>
                            <span>{item.name}</span>
                            <img src={yjt} alt=""/>
                        </li>
                    ))}
                    </ul>
                    :<React.Fragment></React.Fragment>
                }
                <div className="con-one"
                onClick={FunShowS}>
                    <span>场景筛选</span>
                    <img src={sjt} alt=""  ref={sjtRef2}/>
                </div>
                {
                    <ul  className="con-two clearfix" style={{display:showScene?'block':'none'}}>
                        {sceneList.map(item=>(
                            <li key={item.name} 
                            onClick={goto.bind(null,'/list/?fid='+item.fid)}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                            <img src={yjt} alt=""/>
                        </li>
                        ))
                        }
                    </ul>
                }
                <div className="con-one"
                onClick={goto.bind(null,'/snack')}>
                    <span>所有小食</span>
                    <i className="num">9</i>
                </div>
                <div className="con-one"
                onClick={goto.bind(null,'/list/?name=parts')}>
                    <span>所有配件</span>
                    <i className="num">4</i>
                </div>
            </div>
        </div>
    )
}

Handpick = withRouter(Handpick);
export default Handpick;