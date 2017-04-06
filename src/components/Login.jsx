import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn, loginUser, loginUserRequest, loginUserFailure, loginUserSuccess, logout  } from '../actions/Login';
import { history } from '../store/configureStore';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  
  componentDidMount() {
    if (loggedIn()) {
      // Redirect to Home
      history.replaceState(null, '/');
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const email = this.refs.email.value;
    const pass = this.refs.password.value;
    
    console.log('email = ', email);
    console.log('pass = ', pass)
    
    const {dispatch} = this.props;
    dispatch(loginUserRequest());
    
    actions.loginUser(email, pass).then((r) => {
      dispatch(loginUserSuccess(r));
      // Redirect to Home
      history.replaceState(null, '/');
    }).catch((e) => {
      dispatch(actions.loginUserFailure());
    });
  }
  
  render() {
    return (
      <div className="box">
        {this.state.error && (
          <div className="alert">Invalid login</div>
        )}
        <form onSubmit={this.handleSubmit}>
          <header className="toolbar toolbar-header">
            <h1 className="title">Login</h1>
          </header>
          
          <div className="padded">
            <div className="form-group">
              <label htmlFor="input-id-email">Email Address</label>
              <input type="email" className="form-control"
                id="input-id-email"
                ref="email"
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="input-id-password">Password</label>
              <input type="password" className="form-control"
                id="input-id-password"
                ref="password"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>

          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
              <button type="submit" className="btn btn-primary pull-right">Submit</button>
            </div>
          </footer>
        </form>
      </div>
    )
  }
}

export class Logout extends Component {
  componentDidMount() {
    logout();
  }
  render() {
    return (
      <div>
        <p>You are now logged out!</p>
      </div>
    )
  }
}

export default connect(state => state)(Login);