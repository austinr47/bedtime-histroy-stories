import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import background from '../assets/cropped-background_large_new.png'
import axios from 'axios'
import appleLogo from '../assets/Apple_Logo.svg'
import youTube from '../assets/You-Tube logo.png'
import spotifyLogo from '../assets/Spotify_logo.svg.png'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('/featured').then(response => {
      const resp = response.data[0]
      this.setState({
        title: resp.title,
        description: resp.description,
        id: resp.id,
        audio: resp.audio_url
      })
    })
  }

  render() {
    return (
      <div id='home' style={{ backgroundImage: 'url(' + background + ')'}}>
        <div className='header'>
          <span>inspirational stories for kids</span>
        </div>

        <div className='menu'>
          <div className='title'>
            <span>Bedtime History</span>
          </div>
          <div>
            <span><NavLink activeClassName="active" to='/' className='link-white'>home</NavLink></span>
            <span><NavLink to='/episodes' className='link-white'>episodes</NavLink></span>
            <span><NavLink to='/how-to-listen' className='link-white'>how to listen</NavLink></span>
            <span><NavLink to='/book' className='link-white'>book</NavLink></span>
            <span><NavLink to='/about' className='link-white'>about</NavLink></span>
          </div>
        </div>

        <div className='content'>
          <div className='featured'>
            <div className='iframe'><iframe title={this.state.id} width="100%" height="100%" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.state.audio}&color=%234c4c44&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe></div>
            <div className='details'>
              <NavLink className='link-black' to={`/episodes/${this.state.id}`}>
                <h2>{this.state.title}</h2>
              </NavLink>
              <p>{this.state.description}</p>
            </div>
          </div>
          <div className='links'>
            <a className='link-black' href='https://www.youtube.com/c/bedtimehistory' target='blank'><span className='img'><img src={appleLogo} alt='appleLogo'/></span><span className='words'>Listen on <br/> Apple Podcasts</span></a>
            <a className='link-black' href='https://www.youtube.com/c/bedtimehistory' target='blank'><span className='img'><img src={youTube} alt='appleLogo'/></span><span className='words'>Watch Videos on <br/> YouTube</span></a>
            <a className='link-black' href='https://www.youtube.com/c/bedtimehistory' target='blank'><span className='img'><img src={spotifyLogo} alt='appleLogo'/></span><span className='words'>Listen on <br/> Spodify</span></a>
          </div>
        </div>

        <div className='social'>
          <a href='https://www.facebook.com/bedtimehistory/' target='blank'><i className="fab fa-facebook-square fa-4x"></i></a>
          <a href='https://www.instagram.com/bedtimehistory/' target='blank'><i className="fab fa-instagram fa-4x"></i></a>
          <a href='https://www.youtube.com/c/bedtimehistory' target='blank'><i className="fab fa-youtube fa-4x"></i></a>
        </div>
        <div className='footer'>
        </div>
      </div>
    );
  }
}