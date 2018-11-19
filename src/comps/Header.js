import React, { Component } from 'react';

class Header extends Component {
    render() {
      return (
        <div style={styles.header} className="App-header">
            <ul>
                <li><a href="#">Neaby Shops</a></li>
                <li><a href="#">my Preferred Shops</a></li>
            </ul>
        </div>
      );
    }
}

const styles = {
  header:{
    padding:20
  },
}
  
export default Header;
  