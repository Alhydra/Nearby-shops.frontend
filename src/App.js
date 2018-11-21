import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import { NavLink, Switch, Route } from 'react-router-dom';

// Routes
import Header from "./comps/Header"
import ShopList from "./comps/ShopList"
import Home from "./comps/Home"

// Logout component
const logout =()=>{
  
}
class Logout extends Component {

  constructor(props){
    super(props)

    this.logout()

    
  }

  logout(){
    localStorage.removeItem("MyToken")
    window.location = 'http://localhost:3000';
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

// Main router navigation
const MainNav = (props) => (
  <Switch>
    <Route exact path='/' component={Home} ></Route>
    <Route exact path='/nearby-shops' component={ShopList} ></Route>
    <Route exact path='/my-prefered-shops' component={ShopList} ></Route>
    <Route exact path='/logout' component={Logout} ></Route>
  </Switch>
);

class App extends Component {
  constructor(props){
    super(props)

    // initialise initial state
    this.state={
        user:{}
    }
  }

  componentDidMount(){

    // if there is not token provided navigate to login & sign in home page
    const token = localStorage.getItem('MyToken');

      if(!token){

    }

    // Log in
    // request body
    /* const body={
      email:"ellhydra1@gmail.com",
      password:"111222333"
    }

    if(token){

      const header = {
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','x-access-token':token }
      }
      // if token exists get user data
      axios.post("http://localhost:3001/api/user",header,body)
      .then((res)=>{
      // add user data to the state
      this.setState({
        user:res.data
      })

        
      })
      .catch((err)=>{
        console.log(err);
        
      })
    }else{
      //if token does not exist get a token
      axios.post("http://localhost:3001/auth",body)
        .then((res)=>{
        localStorage.setItem("MyToken",res.data.token)
        
        })
        .catch((err)=>{
          console.log(err);
          
        })
    } */
    
  }
    
  render() {
    return (
      <div className="App">
        <MainNav />
      </div>
    );
  }
}



export default App;
