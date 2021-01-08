import React, { Component } from'react';
import { Route } from 'react-router';
// import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css'

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        errorOccured: false
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        // this.props.history.push('/posts/' + id );
        // this.setState({selectedPostId: id});
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
            // console.log(response)
        })
        .catch(error => {
            console.log(error);
            // this.setState({errorOccured: true})
        });
    }

    render(){
        let posts = <p style = {{textAlign: 'center'}}>Oopss...! Something went wrong!</p>
        if(!this.state.errorOccured) {
            posts = this.state.posts.map(post => {
            return (
            // <Link to= {'/posts/' + post.id} key = {post.id} >
                <Post 
                    key = {post.id}
                    title = {post.title} 
                    author = {post.author} 
                    clicked = {() => this.postSelectedHandler(post.id)}/>
            
                );
            });  
            
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path = {this.props.match.url + "/:postid"} exact component = {FullPost}/>
            </div>
            
               
        );
    }
}

export default Posts;