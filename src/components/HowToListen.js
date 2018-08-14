import React, { Component } from 'react';
import Menu from './Menu'
import iphone from '../assets/iphone-sketch.png'
import android from '../assets/android-sketch.png'
import background from '../assets/cropped-background_large.png'
import speaker from '../assets/speaker.png'
import video from '../assets/video.png'

export default class HowToListen extends Component {
  constructor() {
    super()
    this.state = {
      iphone: false,
      android: false,
      audio: false,
      video: false,
    }
  }

  showInstructions(key1, key2, key3, key4) {
    const value = !this.state[key1]
    this.setState({
      [key1]: value,
      [key2]: false,
      [key3]: false,
      [key4]: false,
    })
  }

  render() {
    const showIphone = this.state.iphone ? '' : 'hide'
    const showAndroid = this.state.android ? '' : 'hide'
    const showAudio = this.state.audio ? '' : 'hide'
    const showVideos = this.state.video ? '' : 'hide'
    return (
      <div id='listen-main'>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>

        <Menu />

        <div className='content'>
          <h3>How to listen to the podast</h3>
          <p>Click on an image to view instructions</p>
          <div className='all-devices'>
            <div className='device iphone' onClick={() => {this.showInstructions('iphone', 'android', 'audio', 'video')}}>
              <div><img alt='iPhone' src={iphone} /></div>
              <span>iPhone</span>
            </div>
            <div className='device android' onClick={() => {this.showInstructions('android', 'iphone', 'audio', 'video')}}>
              <div><img alt='Android' src={android}/></div>
              <span>Android</span>
            </div>
            <div className='device audio' onClick={() => {this.showInstructions('audio', 'iphone', 'android', 'video')}}>
              <div><img alt='Audio' src={speaker}/></div>
              <span>Audio</span>
            </div>
            <div className='device videos' onClick={() => {this.showInstructions('video', 'iphone', 'audio', 'android')}}>
              <div><img alt='Videos' src={video}/></div>
              <span>Videos</span>
            </div>
          </div>
          <div className='instructions'>
            <div className={showIphone}>iphone</div>
            <div className={showAndroid}>android</div>
            <div className={showAudio}>audio</div>
            <div className={showVideos}>videos</div>
          </div>
        </div>

        <div className='footer'>

        </div>
      </div>
    );
  }
}