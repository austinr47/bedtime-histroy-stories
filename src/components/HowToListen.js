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

  showInstructions(key) {
    const value = !this.state[key]
    this.setState({
      [key]: value
    })
  }

  render() {
    console.log(this.state)
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
          <div className='devices'>
            <div className='iphone' onClick={() => {this.showInstructions('iphone')}}>
              <img alt='iPhone' src={iphone} />
              <span>iPhone</span>
            </div>
            <div className='android' onClick={() => {this.showInstructions('android')}}>
              <img alt='Android' src={android}/>
              <span>Android</span>
            </div>
            <div className='audio' onClick={() => {this.showInstructions('audio')}}>
              <img alt='Audio' src={speaker}/>
              <span>Audio</span>
            </div>
            <div className='videos' onClick={() => {this.showInstructions('video')}}>
              <img alt='Videos' src={video}/>
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