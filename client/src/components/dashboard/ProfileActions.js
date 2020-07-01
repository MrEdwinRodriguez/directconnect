import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/style.css';

const ProfileActions = () => {
  return (
    <div>
      <div className='container'>
          <div className="btn-group mb-4 row text-center " role="group" aria-label="Basic example">
              <Link to="/account" type="button" className="btn ">
                <i className="fas fa-user-circle text-royal mr-1"></i>
                Account</Link>
              <Link to="/edit-profile" type="button" className="btn ">
              <i className="fas fa-id-card text-royal mr-1"></i> Edit Profile</Link>
          </div>

      </div>
    </div>
  )
}

export default  ProfileActions;