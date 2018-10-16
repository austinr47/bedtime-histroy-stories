import React, { Component } from 'react';
import axios from 'axios'
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'
import { Link } from 'react-router-dom'
import Loading from './Loading'

export default class EpisodeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: [],
      sorted: 'a',
      loading: true
    }
  }

  componentDidMount() {
    axios.get('/episodes').then(response => {
      this.setState({
        data: response.data,
        searchData: response.data,
        loading: false
      })
    })
  }

  // searching through data to see if value exists anywhere in title
  search(value) {
    const list = []
    this.state.data.map(item => {
      const title = item.title.split('').map((item) => item.toUpperCase()).join('')
      const checkValue = value.split('').map(item => item.toUpperCase()).join('')
      if(title.includes(checkValue)) {
        return list.push(item)
      } return null
    })
    this.setState({
      searchData: list
    })
  }

  // sorting toggling from a-z or z-a
  sort() {
    if(this.state.sorted === 'a') {
      const sorted = this.state.searchData.sort(function(a, b) {
        var titleA = a.title.toUpperCase();
        var titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else return 0;
      });
      this.setState({
        sorted: 'b',
        searchData: sorted
      })
    } else if(this.state.sorted === 'b') {
      const sorted = this.state.searchData.sort(function(a, b) {
        var titleA = a.title.toUpperCase();
        var titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return 1;
        } else if (titleA > titleB) {
          return -1;
        } else return 0;
      });
      this.setState({
        sorted: 'a',
        searchData: sorted
      })
    }
  }

  render() {
    const episodeList = (data) => {
      if(data.length >= 1) {
        return data.map((item) => {
            return (
              <div key={item.id} className='details'>
                <h3>{item.title}</h3>
                <iframe title={item.id} width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.audio_url}&color=%234c4c44&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true&show_playcount=false&buying=false&sharing=false&download=false`}></iframe>
                <div className='description'>{item.description}</div>
                <Link to={`/episodes/${item.id}`} className='btn btn-sm gotodetails'>View Details</Link>
              </div>
            )
        })
      } else return (
        <div>
          No Results 
        </div>
      )
    }

    return (
      <div id='episodes'>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>
        <Menu />

        { this.state.loading &&
          <div>
            <Loading />
          </div>
        }
        { !this.state.loading &&
          <div className='search'>
            <span>Search:</span>
            <input placeholder='Seach episodes' className='form-control' onChange={(event) => {this.search(event.target.value)}}/>
            <button className='btn btn-sm btn-primary' onClick={() => this.sort()}>Sort</button>
          </div>
        }
        { !this.state.loading &&
          <div className='content'>
            {episodeList(this.state.searchData)}
          </div>
        }

        <div className='footer'>

        </div>
      </div>
    );
  }
}