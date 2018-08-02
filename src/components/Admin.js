import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import 'react-datepicker/dist/react-datepicker.css';

export default class Admin extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      date: moment()._d,
      description: '',
      story: '',
      audio: '',
      video: '',
      data: [],
      startDate: moment(),
      loggedIn: false,
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount() {
    // seeing if user is persistant logged in
    axios.get('/user-data/').then(response => {
      if (response.data.user) {
          this.setState({
            loggedIn: true
          })
      }
    });
    // getting list of episodes
    axios.get('/episodes').then(response => {
      this.setState({
        data: response.data
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
    event.preventDefault();
  }

  // logging in
  login() {
    axios.post('/login', {username: this.state.username, password: this.state.password}).then(response => {
      if(response.data.user.username === this.state.username) {
        this.setState({
          loggedIn: true
        })
      }
      // catching error to display message back from server
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  }

  // used if the login is wrong --  AKA wrong user/password
  getMessage = error => error.response
    ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
    : error.message;

    logout() {
      axios.post('/signout').then(response => {
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
                <div>{item.title}</div>
                <div>{item.date_posted}</div>
                <div>{item.description}</div>
                <div>{item.video_url}</div>
                <div>{item.audio_url}</div>
                <Link to={`/edit/${item.id}`}><button type="button" className="edit">Edit</button></Link>
              </div>
            )
        })
      }
    }
    return (
      <div className='admin'>
          <Menu />
        {!this.state.loggedIn &&
          <div>
            <input placeholder='Username' type='text' name="username" onChange={event => this.handleChange(event)}/>
            <input placeholder='Password' type='password' name="password" onChange={event => this.handleChange(event)}/>
            <button onClick={() => this.login()}>Login</button>
            {this.state.message}
          </div>
        }
        {this.state.loggedIn &&
          <div>
            <button onClick={() => this.logout()}>Logout</button>
            <form onSubmit={this.handleSubmit}>
              <label>
                Title
                <input value={this.state.title} type="text" name="title" onChange={event => this.handleChange(event)}/>
              </label>
              <label>
                Date
                <DatePicker
                  selected={this.state.startDate}
                  onChange={(e) => this.dateChange(e)}
                />
              </label>
              <label>
                Description
                <textarea value={this.state.description} name="description" onChange={event => this.handleChange(event)}/>
              </label>
              <label>
                Story
                <textarea value={this.state.story} name="story" onChange={event => this.handleChange(event)}/>
              </label>
              <label>
                Audio URL
                <input value={this.state.audio} type="text" name="audio" onChange={event => this.handleChange(event)}/>
              </label>
              <label>
                Video URL
                <input value={this.state.video} type="text" name="video" onChange={event => this.handleChange(event)}/>
              </label>
              <label>
              <input type="submit" value="Submit"/>
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