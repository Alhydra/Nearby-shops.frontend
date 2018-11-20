import React, { Component } from 'react';
import './App.css';
import Header from "./comps/Header"
import ShopList from "./comps/ShopList"

class App extends Component {
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
