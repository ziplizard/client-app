// Modules
import React from 'react';
import { render } from 'react-dom';

// Global CSS
import "./assets/css/globals.css";
import './vendor/photon/css/photon.css';

import Root from './components/Root.jsx';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = 'root';
document.body.appendChild( root );

// Now we can render our application into it. Main entry point is always the 'Core' component
render( <Root />, document.getElementById(root.id) );

// Hot Module Replacement API
if (module.hot) {
  // If an update is in one of the React components we've included, we can attempt an HMR
  // Note: we are using the only-hot so the app will NOT forcefully reload if it fails
  module.hot.accept( './components/Root.jsx', () => {
    render( <Root />, document.getElementById('root') );
  });
}
