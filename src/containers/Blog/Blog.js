import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
//nav link is used to style active link in various ways : and 'active' class is te default classname of it . if you want to change, change asa below
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
// import FullPost from './FullPost/FullPost';

//see network tab| import newPost dynemically -- lazy loading -- load only AsyncNewPost is called somewhere// that file, loading into the chunk file instead of main bundle
const AsyncNewPost = asyncComponent(() => {
    return import ('./NewPost/NewPost');
});

class Blog extends Component {
state = {
    auth: true
}
    render () {
        return (
            <div className = "Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to = "/posts" 
                            exact
                            activeClassName = "my-active"
                            activeStyle= {{
                                color: "#744179",
                                textDecoration: "underline",
                                fontWeight: "bold"
                            }}>POSTS</NavLink></li>
                            {/* new post is on normal active class */}
                            <li><NavLink to = {{
                                pathname: "/new-post",
                                hash:"#submit",
                                search:"?quick-submit=true"
                                }}>NEW POST</NavLink> </li>
                        </ul>
                    </nav>
                </header>
                {/* exact is used to path which is only localhost:8080/ 'for / only' */}
                {/* in this case page is re-loading not rendering part of the dom */}
                <Switch>
                    {/* swith statements are running orderly */}
                {this.state.auth? <Route path = "/new-post" component = {AsyncNewPost}/>:null}
                <Route path = "/posts"  component = {Posts}/>    
                <Redirect from = "/" to = "/posts"/>
                {/* catch unknown routes */}
                {/* <Route render = {() => <h1 style={{textAlign: 'center'}}>Page not found!</h1>}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;