import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom'
import background from '../assets/cropped-background_large.png'
import axios from 'axios'

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
      })
    })
  }

  render() {
    return (
      <div id='home' style={{ backgroundImage: 'url(' + background + ')',}}>
        <div className='header'>
          <span>inspirational stories for kids</span>
        </div>

        <div className='menu'>
          <div className='title'>
            <span>Bedtime History</span>
          </div>
          <div>
            <span><Link to='/episodes' className='link-white'>all episodes</Link></span>
            <span><Link to='/how-to-listen' className='link-white'>how to listen</Link></span>
            <span><Link to='/book' className='link-white'>book</Link></span>
            <span><Link to='/about' className='link-white'>about</Link></span>
            <span><Link to='/contact' className='link-white'>contact</Link></span>
          </div>
        </div>

        <div className='content'>
            <div className='featured'>
              <div className='image'>

              </div>
              <div>
                <NavLink to={`/episodes/${this.state.id}`}>
                  <h2>{this.state.title}</h2>
                </NavLink>
                <p>{this.state.description}</p>
              </div>
            </div>
          <div className='links'>
            <span>Listen on Apple Podcasts</span>
            <span>Watch Videos on YouTube</span>
            <span>Listen on Spodify</span>
          </div>
        </div>

        <div className='footer'>
          <a href='https://www.facebook.com/bedtimehistory/' target='blank'><i className="fab fa-facebook-square fa-4x"></i></a>
          <a href='https://www.instagram.com/bedtimehistory/' target='blank'><i className="fab fa-instagram fa-4x"></i></a>
          <a href='https://www.youtube.com/c/bedtimehistory' target='blank'><i className="fab fa-youtube fa-4x"></i></a>
        </div>
      </div>
    );
  }
}