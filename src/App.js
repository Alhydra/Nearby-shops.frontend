import React, { Component } from 'react';
import './App.css';
import Header from "./comps/Header"
import ShopList from "./comps/ShopList"
import axios from "axios"

class App extends Component {
  constructor(props){
    super(props)

    // initialise initial state
    this.state={
        user:[]
    }
  }

  componentDidMount(){

    // Log in
    const header = {
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', }
    }

    // request body
    const token = localStorage.getItem('MyToken')

    const body={
      email:"ellhydra1@gmail.com",
      password:"111222333"
    }
    axios.post("http://localhost:3001/auth",body)
        .then((res)=>{
        
        console.log(res.data)
        // add the shops list to the state 
        this.setState({
          user:res.data.user
        })

        // add token to the local storage
        localStorage.setItem('MyToken',res.data.token)
          
        })
        .catch((err)=>{
          console.log(err);
          
        })
    }
  render() {
    return (
      <div className="App">
        <Header />
        <ShopList />
      </div>
    );
  }
}



export default App;
