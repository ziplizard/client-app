import React, { Component } from 'react';
import { connect } from 'react-redux';
//import config from 'electron-json-config';
import { EmailInput, PasswordInput, resetUID } from '../inputs.js';
import { actions } from './component.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    //this.handleChange = this.handleChange.bind(this);
    //resetUID();
  }
  
  // componentDidMount() {
  //   this._isMounted = true;
  // }
  
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
  
  login(e) {
      e.preventDefault();
      
      const {dispatch} = this.props;
      dispatch(actions.loginUserRequest());
      
      actions.loginUser(this.state).then((r) => {
        //this.props.setAuthStatus(true);
        dispatch(actions.loginUserSuccess(r));
      }).catch((e) => {
        //this.props.setAuthStatus(false);
        dispatch(actions.loginUserFailure());
      });
  }
  
  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   //if (this._isMounted) {
  //     this.setState({
  //       [name]: value
  //     });
  //   //}
  // }
  
  /*
            <div className="form-group">
              <label htmlFor="input-id-email">Email Address</label>
              <input type="email" className="form-control"
                id="input-id-email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input-id-password">Password</label>
              <input type="password" className="form-control"
                id="input-id-password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
  */
  
  render() {
    return (
      <div className="box">
        <form>
          <header className="toolbar toolbar-header">
            <h1 className="title">Login</h1>
          </header>
          
          <div className="padded">
            <EmailInput label="Email Address" name="email" value={this.state.email} placeholder="Email Address" onChange={(value) => { this.setState({email: value})}} />
            <PasswordInput label="Password" name="password" value={this.state.password} placeholder="Password" onChange={(value) => { this.setState({password: value})}} />
          </div>

          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
              <button type="submit" className="btn btn-primary pull-right" onClick={this.login.bind(this)} >Submit</button>
            </div>
          </footer>
        </form>
      </div>
    )
  }
}

export default connect(state => state)(Login);
