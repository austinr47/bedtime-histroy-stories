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

      //css
      expand: false,
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

  // updating state with any changes
  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
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

  // used if the login is wrong --  AKA wrong user/password
  getMessage = error => error.response
    ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
    : error.message;

  // setting the episode as featured on landing page
  featured() {
    axios.patch('/set-featured', {id: this.state.id})
  }

  render() {
    // after submitting changes/deleting, this redirects to the admin page and clears the timer
    if (this.state.redirectToAdmin) {
      clearTimeout(this.timer)
      return (
        <Redirect to='/admin'/>
      )
    }

    const story = {
      marginBottom: '0px'
    }

    const height = this.state.expand ? {height: '550px'} : null

    return (
      <div className='edit-episode'>
        <div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
        </div>
        <Menu />
        {!this.state.loggedIn &&
          <div id='admin-login'>
          <div className="admin-container">
            <h2 className="form-signin-heading">Please login</h2>
            <input className="form-control user" placeholder='Username' type='text' name="username" onChange={event => this.handleChange(event)}/>
            <input className="form-control password" placeholder='Password' type='password' name="password" onChange={event => this.handleChange(event)}/>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={() => this.login()}>Login</button>
            {this.state.message}
          </div>
        </div>
        }
        {this.state.loggedIn &&
          <div className='info'>
            <form className='form' onSubmit={this.handleSubmit}>
              <label> Title
                <input className='form-control' value={this.state.title} name='title' onChange={event => this.update(event)}/>
              </label>
              <DatePicker selected={moment(this.state.date)} onChange={(e) => this.dateChange(e)}/>
              <label> Description
                <textarea className='form-control' value={this.state.description} name='description' onChange={event => this.update(event)}/>
              </label>
              <label style={story}> Story
                <textarea style={height} className='form-control' value={this.state.story} name='story' onChange={event => this.update(event)}/>
              </label>
              {!this.state.expand && <span onClick={() => this.setState({expand: true})}>Expand</span>}
              {this.state.expand && <span onClick={() => this.setState({expand: false})}>Colapse</span>}
              <label> Audio
                <input className='form-control' value={this.state.audio} name='audio' onChange={event => this.update(event)}/>
              </label>
              <label> Video
                <input className='form-control' value={this.state.video} name='video' onChange={event => this.update(event)}/>
              </label>
              <input className='form-control' type="submit" value="Submit"/>
            </form>
            <div className='buttons'>
              <button className='btn btn-sm btn-primary' onClick={() => this.featured()}>Set as featured</button>
              <button className='btn btn-sm btn-danger' onClick={() => this.delete()}>Delete</button>
              <Link className='' to='/admin'><button className='btn btn-sm btn-primary'>Back</button></Link>
            </div>
          </div>
        }
      </div>
    );
  }
}


