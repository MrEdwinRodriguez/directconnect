import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PinnedItem from './PinnedItem';
import PostFeed from './PostFeed';
import Spinner from "../common/Spinner";
import { getPosts } from '../../actions/postActions';


class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

  render() {
    const { posts, loading } = this.props.post;
    const { profile, auth } = this.props;
    let postContent;
    let user = auth.user
    let welcomeMessage = <p>Welcome, {user.first_name} {user.last_name}</p>
    if(user && user.profileHandle) {
        welcomeMessage = 
        <p className='lead'>Welcome, <Link to={`/myprofile/${user.profileHandle}`}>
        {user.first_name} {user.last_name}
        </Link>
    </p>
    }

    if(posts === null || loading ) {
        postContent = <Spinner />
    } else {
        postContent = <PostFeed posts={posts} />
    }
    return (
      <div className='feed'>
        <div className='container'>
        <div className="row posRelative" >
            {welcomeMessage}
        </div>
        <div className='row'>
            <div className='col-md-12'>
            <PinnedItem />
            </div>
        </div>
        <div className='row'>
            <div className='col-md-12'>
                <PostForm />
                {postContent}
            </div>
        </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Posts);