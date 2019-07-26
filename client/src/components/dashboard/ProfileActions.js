import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style.css';


const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
    <Link to="/edit-profile" className="btn btn-light">
      <i className="fas fa-user-circle text-royal mr-1"></i> Edit Profile</Link>
    <Link to="/add-experience" className="btn btn-light">
      <i className="fab fa-black-tie text-royal mr-1"></i>
      Add Experience</Link>
      <Link to="/add-education" className="btn btn-light">
      <i className="fab fa-black-tie text-royal mr-1"></i>
      Add Education</Link>
      <Link to="/add-business" className="btn btn-light">
      <i className="fab fa-black-tie text-royal mr-1"></i>
      Add Business</Link>

  </div>
  )
}

export default  ProfileActions;