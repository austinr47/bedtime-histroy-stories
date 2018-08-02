import React, { Component } from 'react';
import Menu from './Menu'

export default class HowToListen extends Component {
  render() {
    return (
      <div id='listen-main'>
        <div className='header'>
          <span></span>
        </div>

        <Menu />

        <div className='content'>
          <div className='devices'>
            <div className='iphone'>
              <img alt='iPhone' />
              <span>iPhone</span>
            </div>
            <div className='android'>
              <img alt='Android' />
              <span>Android</span>
            </div>
            <div className='audio'>
              <img alt='Audio' />
              <span>Audio</span>
            </div>
            <div className='videos'>
              <img alt='Videos' />
              <span>Videos</span>
            </div>
          </div>
          <div className='instructions'>
            
          </div>
        </div>

        <div className='footer'>

        </div>
      </div>
    );
  }
}