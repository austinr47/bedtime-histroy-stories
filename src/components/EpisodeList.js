import React, { Component } from 'react';
import axios from 'axios'
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'
import Pict from '../assets/asset 6.jpeg'

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
            return (
              <div key={item.id} className='details'>
                <img alt={item.title} src={Pict}/>
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