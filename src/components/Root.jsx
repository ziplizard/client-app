import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from './Home.jsx';
import Prospect from './Prospect.jsx';
import Login, { Logout } from './Login.jsx';
import Footer from './Footer.jsx';
import Menu from './Menu.jsx';
import Settings from './Settings.jsx';
//import { browserHistory } from 'react-router';

import { loggedIn } from '../actions/Login'
import { store, history } from '../store/configureStore';

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <div className="pane-sm sidebar"><Menu /></div>
              <div className="pane padded"><AppRouter /></div>
            </div>
          </div>
          <Footer />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

// const requireAuth = (nextState, replaceState) => {
//   console.log('loggedIn() = ', loggedIn());
//   console.log('browserHistory = ', browserHistory);
//   if (!loggedIn()) {
//     // Redirect to Login
//     //replaceState(null, '/login');
//     browserHistory.push('/login');
//   }
// }

//const AppRouter = () => {
class AppRouter extends Component {
  requireAuth = (nextState, replaceState) => {
    console.log('loggedIn() = ', loggedIn());
    // console.log('browserHistory = ', browserHistory);
    if (!loggedIn()) {
      // Redirect to Login
      replaceState(null, '/login');
      // browserHistory.push('/login');
    }
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} onEnter={this.requireAuth} />
        {/*<Route exact path="/" handler={requireAuth(Home)} />*/}
        {/*<Route exact path="/" handler={this.requireAuth(Home)} />*/}
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/prospects" component={Prospect} onEnter={this.requireAuth} />
        <Route path="/settings" component={Settings} onEnter={this.requireAuth} />
      </Switch>
    )
  }
}

export default Root;
