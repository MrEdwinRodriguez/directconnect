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
            <div className='col-4 col-lg-2'>
              <span >
                <img src={isEmpty(profile.profileImage) ? "/blank.png" : profile.profileImage} alt="" className="rounded-circle" />
              </span>
            </div>
            <div className='col-lg-6 col-md-4 col-8'>
              <h3>{profile.user.name}</h3>
              <p>{profile.status} {isEmpty(profile.company) ? null : (<span>@ {profile.company}</span>)}</p>
              <p>{isEmpty(profile.location) ? null : (<span>@ {profile.location}</span>)}</p>
              <p>{isEmpty(profile.lookingFor) ? (<span>Currently Not Looking for New Position</span>)  : (<span>Looking For:  {profile.lookingFor} </span>)}</p>
              <Link to={`/profile/${profile.handle}`} className='btn btn-royal text-white'>View Profile</Link>
            </div>
            <div className='col-md-4 d-none d-md-block'>
              <h4>Skill Set</h4>
              <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
              </ul>
            </div>
          </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;