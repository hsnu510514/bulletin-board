import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false
	}

	componentDidMount() {
		axios.get('/posts')
			.then(response => {
				// 得到的資料只取前四個
				const posts = response.data.slice(0, 4);
				// 再將剩下的資料篩選出自己想要的內容，最後回傳物件更新
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Max'
					}
				});
				// 存入state，再由State轉為想要的格式
				this.setState({ posts: updatedPosts })
			})
			// 新增state error欄位，根據此欄位決定顯示的內容
			.catch(error => {
				this.setState({ error: true });
				console.log(error);
			})
	}

	postSelectedHandler = (id) => {
		// 新增state欄位 selectedPostId，點擊後將id 傳入此欄位
		// this.setState({ selectedPostId: id })
		// 除了Link外的跳轉方式
		this.props.history.push({pathname: '/posts/' + id})
	}

	render() {
		let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>

		if (!this.state.error) {
			posts = this.state.posts.map(post => {
				// Posts由於使用<Route/> 顯示，本身props具有match/history....，但是子component不具備
				// 解決辦法1: 將props傳入子component中
				// 解決辦法2: 將post使用withRouter包起來
				return <Post 
					key={post.id}
					title={post.title}
					author={post.author}
					clicked={() => this.postSelectedHandler(post.id)} />
			})
		}

		return (
			<div>
				<section className="Posts">
					{posts}
				</section>
				<Route 
					path={this.props.match.url + '/:id'}
					component={FullPost}/>
			</div>
		)
  };
};

export default Posts;