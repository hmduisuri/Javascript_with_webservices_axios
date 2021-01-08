import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
//nav link is used to style active link in various ways : and 'active' class is te default classname of it . if you want to change, change asa below
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';
// import axios from 'axios';
// import axios from '../../axios'

class Blog extends Component {

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
                <Route path = "/new-post" component = {NewPost}/>
                <Route path = "/posts"  component = {Posts}/>    
                <Redirect from = "/" to = "/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;