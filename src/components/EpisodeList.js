import React, { Component } from 'react';
import axios from 'axios'
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'

export default class EpisodeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('/episodes').then(response => {
      this.setState({
        data: response.data
      })
    })
  }

  render() {
    const episodeList = (data) => {
      if(data) {
        return data.map((item, index) => {
          // console.log(item)
            return (
              <div key={item.id} className='details'>
                <iframe title={item.id} width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.audio_url}&color=%234c4c44&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>
                <div>
                  <h3>{item.title}</h3>
                  <div>{item.description}</div>
                </div>
              </div>
            )
        })
      }
    }
    return (
      <div id='episodes'>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>
        <Menu />

        <div className='content'>
            {episodeList(this.state.data)}
        </div>

        <div className='footer'>

        </div>
      </div>
    );
  }
}