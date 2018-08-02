import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Menu extends Component {
  render() {
    return (
      <div id='menu-component'>
        <span><NavLink activeClassName="active" to='/book' className='link-black' >Book</NavLink></span>
        <span><NavLink activeClassName="active" to='/how-to-listen' className='link-black' >How To Listen</NavLink></span>
        <span><NavLink activeClassName="active" to='/featured' className='link-black' >Stories</NavLink></span>
        <span><NavLink activeClassName="active" to='/episodes' className='link-black' >Episodes</NavLink></span>
        <span><NavLink activeClassName="active" to='/contact' className='link-black' >Contact</NavLink></span>
        <span><NavLink activeClassName="active" to='/about' className='link-black' >About</NavLink></span>
      </div>
    );
  }
}