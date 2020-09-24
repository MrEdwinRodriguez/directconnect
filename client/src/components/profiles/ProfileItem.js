import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;


    return (
      <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-4 col-lg-2 text-center'>
              <span >
                <img src={isEmpty(profile.profileImage) ? "/blank.png" : profile.profileImage} alt="" className="rounded-circle smallProfileImage" />
              </span>
            </div>
            <div className='col-lg-6 col-md-4 col-8'>
              <h3>{profile.user && profile.user.name ? profile.user.name : profile.name }</h3>
              <p className='mb0'>{profile.user && profile.user.email ? <strong>{profile.user.email}</strong> : <strong>{profile.email}</strong>}</p>
              <p className='mb0'>{profile.title && isEmpty(profile.company) ? profile.title : ""}</p>
              <p className='mb0'>{profile.title && !isEmpty(profile.company) ? (<span> {profile.title} @ {profile.company}</span>) : null}</p>
              <p className='mb0'>{!profile.title && !isEmpty(profile.company) ? (<span>@ {profile.company}</span>) : null}</p>
              <p className='mb0'>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
              <p className='mb0'>{isEmpty(profile.lookingFor) ? ""  : (<span>Looking For a Position:  {profile.lookingFor} </span>)}</p>
              {profile.handle ? <Link to={`/profile/${profile.handle}`} className='btn btn-royal text-white mt15'>View Profile</Link> : <p>profile not created</p>}
            </div>
            {profile.skills ?
            <div className='col-md-4 d-none d-md-block'>
              <h4>Skill Set</h4>
              <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item skills">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
              </ul> 
            </div>: ""}
          </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;