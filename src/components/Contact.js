import React, { Component } from 'react';
import Menu from './Menu';
import background from '../assets/cropped-background_large.png';
import axios from 'axios';
import Loading from './Loading';

export default class Contact extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			message: '',
			sent: false,
			sending: false
		};
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleChange(state, value) {
		this.setState({
			[state]: value
		});
	}

	handleSubmit(event) {
		const {name, email, message} = this.state;
		if(name !== '' && email !== '' && message !== ''){
			this.setState({sending: true});
			axios.post('/api/send', {
				name,
				email,
				message
			}).then(response => {
				console.log(response);
				this.setState({
					sentMessage: response.data,
					name: '',
					email: '',
					message: '',
					sent: true,
					sending: false
				});
			});
		} else {
			alert('All fields required');
		} 
		event.preventDefault();
	}

	render() {
		const button = this.state.name && this.state.email && this.state.message ? 'btn-primary' : 'btn-secondary';
		return (
			<div className='contact'>
				<div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
				</div>
				<Menu />

				{ this.state.sent &&
          <div>
          	{this.state.sentMessage}
          </div>
				}
				{ this.state.sending &&
            <Loading/>
				}
				{ !this.state.sent && !this.state.sending &&
          <form className='form' onSubmit={this.handleSubmit}>
            <label>
              Name*: 
          		<input className='form-control' placeholder={this.state.name} onChange={event => this.handleChange('name', event.target.value)}/>
          	</label>
          	<label>
              Email*: 
          		<input className='form-control' placeholder={this.state.email} onChange={event => this.handleChange('email', event.target.value)}/>
          	</label>
          	<label>
              Message*: 
          		<textarea className='form-control' placeholder={this.state.message} onChange={event => this.handleChange('message', event.target.value)}/>
          	</label>
          	<label>
          		<button disabled={this.state.name && this.state.email && this.state.message ? false : true} className={`${button} btn btn-sm btn-block`} type="submit" value="Send">Send</button>
          	</label>
          </form>
				}
			</div>
		);
	}
}