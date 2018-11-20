import React, { Component } from 'react';
import './App.css';
import axios from "axios"

// Routes
import Header from "./comps/Header"
import ShopList from "./comps/ShopList"
import Home from "./comps/Home"

class App extends Component {
  constructor(props){
    super(props)

    // initialise initial state
    this.state={
        user:{}
    }
  }

  componentDidMount(){

    // Log in
    // request body
    const token = localStorage.getItem("MyToken")

    const body={
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
    }
    
  }
    
  render() {
    return (
      <div className="App">
        <Home />
        {/* <Header />
        <ShopList user={this.state.user}/> */}
      </div>
    );
  }
}



export default App;
