import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { getBlog } from '../../actions/contentActions';


class Blog extends Component {
   
    componentDidMount () {
        this.props.getBlog(this.props.match.params.blog)
    }
  render() {
      console.log(this.props)
    const { blog } = this.props;

    let blogItem;

    if(blog === null) {
        blogItem = <Spinner />
    } else {
        if(blog) {
            // blogItem = profiles.map(profile => (
            //     <ProfileItem key={p._id} profile={profile} />
            // ))
            blogItem = 
            <div className='card card-body bg-light mb-3'>
            <div className='row'>
              <div className='col-lg-6 cold-md-4 col-8'>
                {/* <h3>{business.business}</h3> */}
                <p>Blog Name: {blog.name}</p>
                <p>Link: {blog.link}</p>
                <p>Creator: {blog.user}</p>
              </div>
              <div className='col-md-6'>
                <h4>Description</h4>
                <p>{blog.about ? blog.about: "No description added yet"}</p>
              </div>
            </div>
        </div>      
   
        } else {
            blogItem = <h4>No Blog Was Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/blogs" className="btn btn-light mb-3">Back To Blogs</Link>
                        <h1 className="display-4 text-center">Blue and White Profiles</h1>
                        <p className="lead text-center">
                        Support Blogs created by Sigmas and Zetas
                        </p>
                        {blogItem}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Blog.propTypes = {
    getBlog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    blog: state.content.blog

})

export default connect(mapStateToProps, {getBlog})(Blog);