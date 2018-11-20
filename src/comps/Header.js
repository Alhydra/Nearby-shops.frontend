import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import "../App.css"

class Header extends Component {
    render() {
      return (
        <div style={styles.header} className="App-header">
            <ul>
                <NavLink activeClassName="active" to="/nearby-shops"><li>Neaby Shops</li></NavLink>
                <NavLink activeClassName="active" to="/my-prefered-shops"><li>my Preferred Shops</li></NavLink>
                <NavLink activeClassName="active" to="/logout"><li>Log out</li></NavLink>

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
  