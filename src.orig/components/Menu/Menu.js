import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className="nav-group">
      <MenuRow path="/" label="Home" icon="home" />
      <MenuRow path="/example" label="Settings" icon="cog" />
    </nav>
  );
}

const MenuRow = (props) => {
  return (
    <NavLink to={props.path} className="nav-group-item" activeClassName="active" exact={true}>
      <span className={"icon icon-" + props.icon}></span>
      {props.label}
    </NavLink>
  )
}

export default Menu;
