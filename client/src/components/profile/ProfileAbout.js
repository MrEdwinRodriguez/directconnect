import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';

class ProfileAbout extends Component {
  render() {
      const { profile } = this.props;

        //Get First Name
        let firstName = null;
        if (profile.user && profile.user.first_name) {
          firstName = profile.user.first_name;
        }

        //skill list
        let skills = [];
        if (profile && profile.skills) {
          skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check" />{skill}
            </div>
          ))
        }

    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-royal">Bio</h3>
            <p className="lead">{isEmpty(profile.bio) ? <span>{firstName} does not have a bio set up.</span> : (<span>{profile.bio}</span>)}
            </p>
            <hr />
            <h3 className="text-center text-royal">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}
export default  ProfileAbout;