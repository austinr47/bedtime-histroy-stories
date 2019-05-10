import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import 'react-datepicker/dist/react-datepicker.css'
import background from '../assets/cropped-background_large.png'
import Loading from './Loading'

export default class Admin extends Component {
  constructor() {
    super()
    this.state = {
      // episode list
      data: [],

      // new episode
      title: '',
      date: moment()._d,
      description: '',
      story: '',
      audio: '',
      video: '',
      startDate: moment(),

      // log in
      loggedIn: false,
      username: '',
      password: '',
      message: '',

      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.timer = null
  }

  componentDidMount() {
    // seeing if user is persistant logged in
    axios.get('/user-data/').then(response => {
      if (response.data.user) {
        this.setState(
          {loggedIn: true, username: '', password: ''},
          () => this.timer = setTimeout(() => this.setState({ loggedIn: false }), 600000)
        )
      }
    });
    // getting list of episodes
    axios.get('/episodes').then(response => {
      this.setState({
        data: response.data,
        loading: false
      })
    })
  }

  // any state input changes uses this function 
  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      [key]: value
    })
  }

  // state change with date pick
  dateChange(date) {
    this.setState({
      date: date._d,
      startDate: date,
    })
  }

  // posting new episode and then getting it to add to list
  handleSubmit(event) {

    axios.post('/add-episode', { title: `${this.state.title}`, date: `${this.state.date}`, description: `${this.state.description}`, story: `${this.state.story}`, audio: `${this.state.audio}`, video: `${this.state.video}` }).then(() => {
      this.setState({
        title: '',
        description: '',
        story: '',
        audio: '',
        video: '',
      })
      axios.get('/episodes').then(response => {
        this.setState({
          data: response.data
        })
      })
    })
    // this is preventing the page from reloading
    event.preventDefault();
  }

  // logging in
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

  // used if the login is wrong -- AKA wrong user/password
  getMessage = error => error.response
    ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
    : error.message;

  logout() {
    axios.post('/signout').then(response => {
      clearTimeout(this.timer)
      this.setState({
        loggedIn: false
      })
    })
  }

  render() {
    const episodeList = (data) => {
      if(data) {
        return data.map((item, index) => {
            return (
              <div key={item.id} className='episode-details'>
                <div>Preview: <iframe title={item.id} width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.audio_url}&color=%234c4c44&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe></div>
                <div>Title: {item.title}</div>
                <div>Date: {item.date_posted}</div>
                <div>Description: {item.description}</div>
                <div>Video: {item.video_url}</div>
                <div>Audio: {item.audio_url}</div>
                <Link className='btn btn-primary btn-lg' to={`/edit/${item.id}`}><button className='edit btn btn-primary btn-lg' type="button">Edit</button></Link>
              </div>
            )
        })
      }
    }
    return (
      <div className='admin'>
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
        {this.state.loggedIn  &&
          <div className='info'>
            <button className='btn btn-sm btn-danger btn-block logout' onClick={() => this.logout()}>Logout</button>
            <form className='form' onSubmit={this.handleSubmit}>
              <div>Add new episode</div>
              <label> Title
                <input className='form-control' value={this.state.title} type="text" name="title" onChange={event => this.handleChange(event)}/>
              </label>
              <label> Date
                <DatePicker selected={this.state.startDate} onChange={(e) => this.dateChange(e)}/>
              </label>
              <label> Description
                <textarea className='form-control' value={this.state.description} name="description" onChange={event => this.handleChange(event)}/>
              </label>
              <label> Story
                <textarea className='form-control' value={this.state.story} name="story" onChange={event => this.handleChange(event)}/>
              </label>
              <label> Audio URL
                <input className='form-control' value={this.state.audio} type="text" name="audio" onChange={event => this.handleChange(event)}/>
              </label>
              <label> Video URL
                <input className='form-control' value={this.state.video} type="text" name="video" onChange={event => this.handleChange(event)}/>
              </label>
              <label><input className='btn btn-lg btn-primary btn-block' type="submit" value="Submit"/>
              </label>
            </form>
            <div>
              {episodeList(this.state.data)}
            </div>
          </div>
        }
      </div>
    );
  }
}