import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import Menu from './Menu'

export default class EpisodeDetails extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      date: '',
      description: '',
      story: '',
      audio: '',
      video: '',
      id: '',
      redirectToAdmin: false,
      loggedIn: false,
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentDidMount() {
    axios.get('/user-data/').then(response => {
      if (response.data.user) {
          // this.props.login(response.data.user);
          this.setState({
            loggedIn: true
          })
      }
    });
    axios.get(`/episode/${this.props.match.params.id}`).then(response => {
      const resp = response.data[0]
      this.setState({
        title: resp.title,
        date: resp.date_posted,
        description: resp.description,
        story: resp.story,
        audio: resp.audio_url,
        video: resp.video_url,
        id: this.props.match.params.id
      })
    })
  }

  update(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  handleSubmit(event) {
    const {title, date, description, story, audio, video, id } = this.state
    axios.patch('/edit-episode', {title, date, description, story, audio, video, id}).then(response => {
      const resp = response.data[0]
      console.log(moment(resp.date_posted, "MM-DD-YYYY"))
      this.setState({
        title: resp.title,
        date: resp.date_posted,
        description: resp.description,
        story: resp.story,
        audio: resp.audio_url,
        video: resp.video_url,
        redirectToAdmin: true
      })
    })
    event.preventDefault();
  }

  dateChange(date) {
    this.setState({
      date: date._d
    })
  }

  delete() {
    axios.delete(`/delete-episode/${this.props.match.params.id}`).then(() => {
      this.setState({
        redirectToAdmin: true
      })
    })
  }

  render() {
    if (this.state.redirectToAdmin) {
      return (
        <Redirect to='/admin'/>
      )
    }
    console.log(this.state.date)
    return (
      <div className='episode-details'>
        <Menu />
        {!this.state.loggedIn &&
          <div>
            <input placeholder='Username' type='text' name="username" onChange={event => this.update(event)}/>
            <input placeholder='Password' type='password' name="password" onChange={event => this.update(event)}/>
            <button onClick={() => this.login()}>Login</button>
            {this.state.message}
          </div>
        }
        {this.state.loggedIn &&
          <div>
            <form onSubmit={this.handleSubmit}>
              <input value={this.state.title} name='title' onChange={event => this.update(event)}/>
              <DatePicker
                selected={moment(this.state.date)}
                onChange={(e) => this.dateChange(e)}
              />
              <input value={this.state.description} name='description' onChange={event => this.update(event)}/>
              <input value={this.state.story} name='story' onChange={event => this.update(event)}/>
              <input value={this.state.audio} name='audio' onChange={event => this.update(event)}/>
              <input value={this.state.video} name='video' onChange={event => this.update(event)}/>
              <input type="submit" value="Submit"/>
            </form>
            <button onClick={() => this.delete()}>Delete</button>
          </div>
        }
      </div>
    );
  }
}