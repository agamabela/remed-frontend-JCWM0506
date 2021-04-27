import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import NavBarComp from './components/navbar';
import { URLAPI } from './helper';
import LandingPage from './pages/landingPage';
import loginPage from './pages/loginPage';
import {authLogin} from '../src/actions'
import AddProduct from './pages/addProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    axios.get(URLAPI + `/user?id=${localStorage.getItem("id_tkn")}`)
      .then(res => {
        this.props.authLogin(res.data[0])
      })
      .catch(err => {
        console.log("authLogin error :", err)
      })
  }
  render() { 
    return ( 
      <div>
        <NavBarComp/>
        <Route path="/" component={LandingPage} exact/>
        <Route path="/login" component={loginPage} exact/>
        <Route path="/add" component={AddProduct}/>

      </div>

     );
  }
}
 
export default connect(null, {authLogin}) (App);