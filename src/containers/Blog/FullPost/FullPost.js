import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
	state = {
		loadedPost: null
	}

	componentDidUpdate() {
		if (this.props.match.params.id) {
			if (!this.state.loadedPost || (this.state.loadedPost.id !== +this.props.match.params.id)) {
				axios.get('/posts/' + this.props.match.params.id)
					.then(response => {
						this.setState({ loadedPost: response.data })
					})
			}
		}
	}

	deletePostHandler = () => {
		axios.delete('/posts/' + this.props.match.params.id)
			.then(response => {
				console.log(response);
			})
	}

	render() {
		let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
		// Ajax中間需要時間，因此先確認有無id，有的話載入讀取過程
		if (this.props.match.params.id) {
			post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
		}
		// 載入完畢，將內容更新為下載的檔案
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button 
							onClick={this.deletePostHandler} className="Delete">Delete</button>
					</div>
				</div>
			);
		}

		return post;
	}
}

export default FullPost;