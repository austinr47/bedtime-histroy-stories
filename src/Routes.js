import React, { Component } from 'react';
import Home from './components/Home'
import About from './components/About'
import Book from './components/Book'
import Contact from './components/Contact'
import EpisodeList from './components/EpisodeList'
import Admin from './components/Admin'
import HowToListen from './components/HowToListen'
import { Route, Switch } from 'react-router-dom'
import EpisodeDetails from './components/EpisodeDetails';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ Home } /> 
          <Route exact path='/featured' component={ Home } /> 
          <Route path='/book' component={ Book } /> 
          <Route path='/episodes/:name' component={ EpisodeList } /> 
          <Route path='/episodes' component={ EpisodeList } /> 
          <Route path='/how-to-listen' component={ HowToListen } /> 
          <Route path='/about' component={ About } /> 
          <Route path='/contact' component={ Contact } /> 
          <Route path='/admin' component={ Admin } /> 
          <Route path='/edit/:id' component={ EpisodeDetails } /> 
        </Switch>
      </div>
    );
  }
}

export default Routes;
