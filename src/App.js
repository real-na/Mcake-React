import './App.css';
import React,{useState,useCallback} from 'react';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom';
import './css/sass/common.scss';
/* 子组件 */
import Top from './component/Top';
import Bottom from './component/Bottom';
/* 路由 */
import Details from './view/Details';
import Home from './view/Home';
import Cake from './view/Cake';
import Snack from './view/Snack';
import Cart from './view/Cart';
import Login from './view/Login';
import Reg from './view/Reg';
import List from './view/List';

/* context */
import MyContext from './context';
//节流
import {throttle} from './utils';

function App(props) {
  const [page,setPage] = useState(1);
  const [isok,changeIsok] = useState(false);
  const scrollApp = useCallback((e)=>{
    e = e || window.event;
    const t = e.target;
    if(t.scrollHeight - (t.scrollTop + t.clientHeight) < 200){
      //如果开关为真，表示上一次的请求已经结束
      if(isok){
        changeIsok(false);
        setPage(page=>page+1);
      }
    }
  });
  return (
    <div className="App">
      {/* 头部 */}
      <Top props={props}/>

      {/* 路由 */}
      <MyContext.Provider value={{page,changeIsok,setPage}}>
      <div className="container" onScroll = {throttle(scrollApp,100)}>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/cake" component={Cake}></Route>
        <Route path="/snack" component={Snack}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/details/:id" component={Details}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/reg" component={Reg}></Route>
        <Route path="/notFound" render={()=><div>找不到页面</div>}></Route>
        <Redirect from="/" to="/home" exact></Redirect>
        <Redirect to="/notFound"></Redirect>
      </Switch>
      </div>
      {/* 底部 */}
      <Bottom props={props}/>
      </MyContext.Provider>
    </div>
  );
}

App = withRouter(App);
export default App;
