import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../../axios';
import './FullPost.css';

class FullPost extends Component {
        state = {
            loadedPosts: null
        }

    componentDidMount ()  {
        console.log('full post updated');
        this.loadData(); 
    }
    
    componentDidUpdate () {
        this.loadData(); 
    }

    loadData (){
        if(this.props.match.params.postid) {
            if(!this.state.loadedPosts || (this.state.loadedPosts && this.state.loadedPosts.id != this.props.match.params.postid)) {
                //full url is set on index.html as default or axios.js file
                axios.get('/posts/' + this.props.match.params.postid)
                .then(response => {
                    this.setState({loadedPosts: response.data})
                    // console.log(response);
                });          
            }
        }
    }

    deletePostHandler = ()  => {
        axios.delete('/posts/' + this.props.match.params.postid)
        .then(response => {
            console.log(response);
        });
    }

    render () {
        console.log('full post rendered');
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        
        // if(!this.props.errorOccured){
        // }
        if(this.props.match.params.postid) {
            post = <p style = {{textAlign: 'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPosts){
           post = (
            <div className="FullPost">
                <h1>{this.state.loadedPosts.title}</h1>
                <p>{this.state.loadedPosts.body}</p>
                <div className="Edit">
                    <button onClick= {this.deletePostHandler} className="Delete">Delete</button>
                </div>
            </div>

            ); 
        }
        
        return post;
    }
}

export default FullPost;