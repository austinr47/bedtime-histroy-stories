import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="ng-scope">
        <div style={{width:'100%', height:'100%'}} className="lds-eclipse">
          <div></div>
        </div>
      </div>
    );
  }
}