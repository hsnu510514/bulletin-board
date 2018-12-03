import React, { Component } from 'react';
// NavLink 較一般Link可有較多樣式變化
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
// 將NewPost使用lazy loading
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

// 在顯示AsyncNewPost時執行 asyncComponent，並且將import() 做為傳入值
const AsyncNewPost = asyncComponent(() => { 
	return import('./NewPost/NewPost') 
});

class Blog extends Component {
	state = {
		auth: true
	}

	render() {
		return (
			<div className="Blog">
				{/* Navigation列 */}
				<header>
					<nav>
						<ul>
							{/* 使用Link避免換頁時全部刷新 */}
							{/* <Link to={{
								pathname: '/new-post',
								hash: '#submit',
								search: '?quick-submit=true'
							}}>New Post</Link> */}
							{/* Link to={pathname: new-post} 預設absolute path (永遠把路徑加到預設路徑之後) */}
							{/* relative path: Link to={pathname: this.props.match.url + 'new-post'} < 將路徑加到現有網址之後 */}
							{/* 可自訂active時的className, ex. activeClassName="my-active" */}
							{/* 可自訂active時的style, ex. activeSytle={{color: '#fa923f', textDecoration: 'underline'}} */}
							<li><NavLink to="/posts" >Posts</NavLink></li>
							<li><NavLink to="/new-post">New Post</NavLink></li>
						</ul>
					</nav>
				</header>
				{/* 當路徑為path時，顯示component */}
				{/* 使用Route決定要顯示不同的內容，當路徑為path時，呈現render內容 exact表完全相同*/}
				{/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
				{/* 使用Route顯示component時，將會自動添加props到欲顯示的Component內 ex. history/location/match */}
				<Switch>
					{this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
					<Route path="/posts" component={Posts} />
					{/* 將/後面的內容設定成id，之後可在this.props.match.params.id中找到 */}
					{/* <Route path="/posts/:id" exact component={FullPost} /> */}

					{/* 使用Redirect 當網址為/時跳轉到/posts */}
					{/* <Redirect from="/" to="/posts" /> */}

					{/* 任何找不到的route顯示not found */}
					<Route render={() => <h1>Not Found</h1>} />
				</Switch>
			</div>
		);
	}
}

export default Blog;