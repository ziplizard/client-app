import React, { Component } from 'react';
import { loggedIn  } from '../actions/Login';
//import { history } from '../store/configureStore';

//const Home = () => {
class Home extends Component {
  componentDidMount() {
    if (!loggedIn()) {
      // Redirect to Login
      //history.replaceState(null, '/login');
      this.transitionTo('/login');
    }
  }
  
  render() {
    return (
      <div>
        <h1>Hello, Matt!</h1>
      </div>
    )
  }
}

export default Home;