import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Redirect, Link } from 'react-router-dom'
import Menu from './Menu'
import background from '../assets/cropped-background_large.png'

export default class EditEpisode extends Component {
  constructor() {
    super()
    this.state = {
      // episode updates
      title: '',
      date: '',
      description: '',
      story: '',
      audio: '',
      video: '',
      id: '',

      // redirect
      redirectToAdmin: false,

      // log in
      loggedIn: false,
      username: '',
      password: '',
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // checking if user logged in on session
    axios.get('/user-data/').then(response => {
      if (response.data.user) {
        this.setState(
          {loggedIn: true},
          () => this.timer = setTimeout(() => this.setState({ loggedIn: false, username: '', password: '' }), 600000)
        )
      }
    });
    // getting the specific episode by passing id in params
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

  login() {
    axios.post('/login', {username: this.state.username, password: this.state.password}).then(response => {
      if(response.data.user.username === this.state.username) {
        this.setState(
          {loggedIn: true, username: '', password: ''},
          () => this.timer = setTimeout(() => this.setState({ loggedIn: false }), 600000)
        )
      }
      // catching error to display message back from server
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  }

  // used to update state for any input
  update(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  // updated changes in db
  handleSubmit(event) {
    const {title, date, description, story, audio, video, id } = this.state
    axios.patch('/edit-episode', {title, date, description, story, audio, video, id}).then(response => {
      const resp = response.data[0]
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

  // datepicker updating state
  dateChange(date) {
    this.setState({
      date: date._d
    })
  }

  // deleting entire episode in db and redirecting to admin page
  delete() {
    axios.delete(`/delete-episode/${this.props.match.params.id}`).then(() => {
      this.setState({
        redirectToAdmin: true
      })
    })
  }

  // setting the episode as featured on landing page
  featured() {
    axios.patch('/set-featured', {id: this.state.id}).then(response => {
      console.log(response)
    })
  }

  render() {
    // after submitting changes/deleting, this redirects to the admin page and clears the timer
    if (this.state.redirectToAdmin) {
      clearTimeout(this.timer)
      return (
        <Redirect to='/admin'/>
      )
    }

    return (
      <div className='episode-details'>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>
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
              <label> Title
                <input value={this.state.title} name='title' onChange={event => this.update(event)}/>
              </label>
              <DatePicker selected={moment(this.state.date)} onChange={(e) => this.dateChange(e)}/>
              <label> Description
                <input value={this.state.description} name='description' onChange={event => this.update(event)}/>
              </label>
              <label> Story
                <input value={this.state.story} name='story' onChange={event => this.update(event)}/>
              </label>
              <label> Audio
                <input value={this.state.audio} name='audio' onChange={event => this.update(event)}/>
              </label>
              <label> Video
                <input value={this.state.video} name='video' onChange={event => this.update(event)}/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
            <button onClick={() => this.featured()}>Set as featured</button>
            <button onClick={() => this.delete()}>Delete</button>
            <Link to='/admin'><button>Back</button></Link>
          </div>
        }
      </div>
    );
  }
}


