import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style.css';


const ProfileActions = () => {
  return (
    <div>
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
    <div>
    <Link to="/add-hiring" className="btn btn-success btn-hiring">
        <i className="text-royal mr-1"></i>
        Hiring For...</Link>
    </div>
    
      
    </div>
  )
}

export default  ProfileActions;