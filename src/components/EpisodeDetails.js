import React, { Component } from 'react';
import Menu from './Menu';
import background from '../assets/cropped-background_large.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default class EpisodeDetails extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			date: '',
			story: '',
			audio: '291065792',
			video: '',
			loading: true
		};
	}

	componentDidMount() {
		axios.get(`/episode/${this.props.match.params.id}`).then(response => {
			const resp = response.data[0];
			this.setState({
				title: resp.title,
				date: resp.date_posted,
				description: resp.description,
				story: resp.story,
				audio: resp.audio_url,
				video: resp.video_url,
				loading: false
			});
		});
	}
	render() {
		return (
			<div>
				<div className='header' style={{ backgroundImage: 'url(' + background + ')',}}>
          
				</div>
				<Menu />

				{ this.state.loading &&
          <div>
          	<Loading />
          </div>
				}
				{ !this.state.loading &&
          <div>
          	<Link to='/episodes' className='btn btn-sm btn-primary'>{'< Back'}</Link>
          	<h2>{this.state.title}</h2>
          	<h6>{this.state.date}</h6>
          	<iframe title='audio' width="600" height="100" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.state.audio}&color=%23292525&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false&show_playcount=false&buying=false&sharing=false&download=false`}></iframe>
          	<div>
          		<p>
          			{this.state.story}
          		</p>
          	</div>
          </div>
				}
			</div>
		);
	}
}