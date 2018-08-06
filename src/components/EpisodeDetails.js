import React, { Component } from 'react';
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'

export default class EpisodeDetails extends Component {
  render() {
    return (
      <div>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>
        <Menu />
      </div>
    );
  }
}