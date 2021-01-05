import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

// import axios from 'axios';
import axios from '../../axios'

class Blog extends Component {
state = {
        posts: [],
        selectedPostId: null,
        errorOccured: false
    }
componentDidMount (){
    axios.get('/posts').then(response => {
        const posts = response.data.slice(0,4);
        const updatedPosts = posts.map(post => {
            return {
                ...post,
                author: 'Max'
            }
        });
        this.setState({posts: updatedPosts});
        console.log(response)
    })
    .catch(error => {
        this.setState({errorOccured: true})
    });
}

postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
}

    render () {
       
        let posts = <p style = {{textAlign: 'center'}}>Oopss...! Something went wrong!</p>
        if(!this.state.errorOccured) {
          posts = this.state.posts.map(post => {
    return <Post key = {post.id} title = {post.title} author = {post.author} clicked = {() => this.postSelectedHandler(post.id)}/>;
            });  
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPostId} errorOccured = {this.state.errorOccured}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;