import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class PodcastItem extends Component {
  render() {
    const { podcast } = this.props;
    return (
      <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-lg-6 cold-md-4 col-8'>
              {/* <h3>{blog.name}</h3> */}
              <p>Name: {podcast.name}</p>
              <p>Link: {podcast.link}</p>
              <p>Creator: {podcast.user} </p>
              <div className='alternativeButton'>
                <Link to={`/content/blog/${podcast.profileId}`} className="btn btn-info mr-1">
                  Read More
                </Link>
              </div>
            </div>
            <div className='col-md-6 d-none d-md-block'>
              <h4>Description</h4>
              <p>{podcast.about ? podcast.about : "No description added yet"}</p>
              <Link to={`/content/podcast/${podcast.profileId}`} className="btn btn-info mr-1">
              Read More
            </Link>
            </div>
          </div>
      </div>
    )
  }
}

PodcastItem.propTypes = {
}

export default PodcastItem;