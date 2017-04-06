import React, { Component } from 'react';
import { components } from '../components.js';

const Home = () => {
  return (
    <div>
      <h1>Welcome Matt!</h1>
      <p>I hope you enjoy using enhanced-electron-react-boilerplate to start your dev off right!</p>
      <div className='padded'>
        <div className={`box padded`}>
          This has a different background color, but uses the same 'box' className. However, thanks to CSS modules the names dont collide. Here we are setting a background color, and overriding the shadow.
        </div>
      </div>
    </div>
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
    //localStorage.removeItem('auth');
    let auth = JSON.parse(localStorage.getItem('auth') || '{}');
    this.state = {
      isAuthenticated: (undefined !== auth.orgid && undefined !== auth.crmUserId),
    }
  }
  
  setAuthStatus = async (status) => {
    this.setState({
      isAuthenticated: status
    });
  }
  
  render() {
    return (
      <div>
        {this.state.isAuthenticated ? (
          <Home />
        ): (
          <components.Login setAuthStatus={this.setAuthStatus} />
        )}
      </div>
    );
  }
}

export default Main;