import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { getPodcast } from '../../actions/contentActions';


class Podcast extends Component {
   
    componentDidMount () {
        this.props.getPodcast(this.props.match.params.podcast)
    }
  render() {
      console.log(this.props)
    const { podcast } = this.props;

    let podcastItem;

    if(podcast === null) {
        podcastItem = <Spinner />
    } else {
        if(podcast) {
            // podcastItem = profiles.map(profile => (
            //     <ProfileItem key={p._id} profile={profile} />
            // ))
            podcastItem = 
            <div className='card card-body bg-light mb-3'>
            <div className='row'>
              <div className='col-lg-6 cold-md-4 col-8'>
                {/* <h3>{business.business}</h3> */}
                <p>Blog Name: {podcast.name}</p>
                <p>Link: {podcast.link}</p>
                <p>Creator: {podcast.user}</p>
              </div>
              <div className='col-md-6'>
                <h4>Description</h4>
                <p>{podcast.about ? podcast.about: "No description added yet"}</p>
              </div>
            </div>
        </div>      
   
        } else {
            podcastItem = <h4>No Podcast Was Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/podcasts" className="btn btn-light mb-3">Back To Podcasts</Link>
                        <h1 className="display-4 text-center">Blue and White Podcasts</h1>
                        <p className="lead text-center">
                        Support Podcasts created by Sigmas and Zetas
                        </p>
                        {podcastItem}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Podcast.propTypes = {
    getPodcast: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    podcast: state.content.podcast

})

export default connect(mapStateToProps, {getPodcast})(Podcast);