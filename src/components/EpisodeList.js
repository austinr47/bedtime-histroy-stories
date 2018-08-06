import React, { Component } from 'react';
import axios from 'axios'
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'

export default class EpisodeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: []
    }
  }

  componentDidMount() {
    axios.get('/episodes').then(response => {
      this.setState({
        data: response.data,
        searchData: response.data
      })
    })
  }

  search(value) {
    const list = []
    this.state.data.map(item => {
      const title = item.title.split('').map((item) => item.toUpperCase()).join('')
      const checkValue = value.split('').map(item => item.toUpperCase()).join('')
      if(title.includes(checkValue)) {
        list.push(item)
      }
    })
    this.setState({
      searchData: list
    })
  }

  render() {
    const episodeList = (data) => {
      if(data) {
        return data.map((item) => {
            return (
              <div key={item.id} className='details'>
                <h3>{item.title}</h3>
                <iframe title={item.id} width="100%" height="200" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.audio_url}&color=%234c4c44&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true&show_playcount=false&buying=false&sharing=false&download=false`}></iframe>
                {/* <iframe width="300" height="166" scrolling="no" frameborder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.audio_url}&color=%23292525&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe> */}
                <div className='description'>{item.description}</div>
                <div className='gotodetails'>View Details</div>
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

        <div>
          <span>Search:</span>
          <input placeholder='Seach episodes' onChange={(event) => {this.search(event.target.value)}}/>
        </div>

        <div className='content'>
          {episodeList(this.state.searchData)}
        </div>

        <div className='footer'>

        </div>
      </div>
    );
  }
}