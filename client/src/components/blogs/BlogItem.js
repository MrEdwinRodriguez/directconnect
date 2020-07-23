import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class BlogItem extends Component {
  render() {
    const { blog } = this.props;
    return (
      <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-lg-6 cold-md-4 col-8'>
              <h3>{blog.name}</h3>
              <p>Name: {blog.name}</p>
              <p>Link: {blog.link}</p>
              <p>Creator: {blog.user} </p>
              <div className='alternativeButton'>
                <Link to={`/content/blog/${blog.profileId}`} className="btn btn-info mr-1">
                  Read More
                </Link>
              </div>
            </div>
            <div className='col-md-6 d-none d-md-block'>
              <h4>Description</h4>
              <p>{blog.about ? blog.about : "No description added yet"}</p>
              <Link to={`/content/blog/${blog.profileId}`} className="btn btn-info mr-1">
              Read More
            </Link>
            </div>
          </div>
      </div>
    )
  }
}

BlogItem.propTypes = {
}

export default BlogItem;