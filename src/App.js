import './App.css';
import React from 'react';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom';

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

function App(props) {
  return (
    <div className="App">
      {/* 头部 */}
      <Top props={props}/>

      {/* 路由 */}
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/cake" component={Cake}></Route>
        <Route path="/sanck" component={Snack}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/details/:id" component={Details}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/reg" component={Reg}></Route>
        <Route path="/notFound" render={()=><div>找不到页面</div>}></Route>
        <Redirect from="/" to="/home" exact></Redirect>
        <Redirect to="/notFound"></Redirect>
      </Switch>
      {/* 底部 */}
      <Bottom props={props}/>
    </div>
  );
}

App = withRouter(App);
export default App;
