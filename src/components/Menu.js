import React from 'react';
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <div id='menu-component'>
      <span><NavLink activeClassName="active" to='/home' className='link-black' >Home</NavLink></span>
      <span><NavLink activeClassName="active" to='/episodes' className='link-black' >Episodes</NavLink></span>
      <span><NavLink activeClassName="active" to='/how-to-listen' className='link-black' >How To Listen</NavLink></span>
      <span><NavLink activeClassName="active" to='/book' className='link-black' >Book</NavLink></span>
      <span><NavLink activeClassName="active" to='/contact' className='link-black' >Contact</NavLink></span>
      <span><NavLink activeClassName="active" to='/about' className='link-black' >About</NavLink></span>
    </div>
  );
}

export default Menu