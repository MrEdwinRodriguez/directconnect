import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser} from '../../actions/authActions';
import { clearCurrentProfile,  getCurrentProfile } from '../../actions/profileActions';
import logo from './../../img/logo-transparent.png'
import '../../css/style.css';

class Navbar extends Component {
  componentDidMount(){
    this.props.getCurrentProfile();
}

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    let profileImage = "";
    let nameDisplay = "";
    if (user && user.first_name) {
      nameDisplay = user.first_name + " " + user.last_name;
    } else if (profile && profile.user) {
      nameDisplay = profile.user.name;
    }
    if (user && user.profileImage) {
      profileImage = 
        <img
        className="rounded-circle navProfileImage"
        src={user.profileImage}
        alt={user.name}
        style={{ width: '25px', marginRight: '5px' }}
      />
    }

    let navProfileLink = user && user.profileHandle ? <Link to={`/myprofile/${user.profileHandle}`} className="nav-link">Profile</Link> : profile && profile.handle ? <Link to={`/myprofile/${profile.handle}`} className="nav-link">Profile</Link>: "";
    let profileLink = user && user.profileHandle ? <Link to={`/myprofile/${user.profileHandle}`} className="dropdown-item "><i className="fas fa-id-card text-royal mr-1"></i>Profile</Link> : profile && profile.handle ?  <Link to={`/myprofile/${profile.handle}`} className="dropdown-item "><i className="fas fa-id-card text-royal mr-1"></i> Profile</Link>: "";
    let editProfileLink = profile && profile._id ?<Link to="/edit-profile" className="dropdown-item"> <i className="fas fa-user-edit text-royal mr-1"></i>Edit Profile</Link> : "";
    let sendEmail = user && (user.is_admin || user.is_org_officer) ? <Link to="/send-email" className="dropdown-item"> <i className="fas fa-envelope-square text-royal mr-1"></i>Send Email</Link> : "";
    // let sendEmail = <Link to="/send-email" className="dropdown-item"> <i className="fas fa-envelope-square text-royal mr-1"></i>Send Email</Link>;
    let adminPage = user && user.is_admin ? <Link to="/admin" className="dropdown-item"> <i className="fas fa-users-cog text-royal mr-1"></i>Admin Page</Link> : "";
    let createProfileLink = !profile|| (profile && !profile._id) ? <Link to="/create-profile" className="dropdown-item"> <i className="fas fa-user-edit text-royal mr-1"></i> Create Profile</Link> : "";
    const inNetworkLinks = (
      <ul className="navbar-nav mr-auto">
      <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Find in Network
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="collapse" data-target="#mobile-nav">
        <Link className="dropdown-item" to="/profiles" >
          {' '}
          Zetas and Sigmas
        </Link>
        <Link className="dropdown-item" to="/profiles/orginization/phi_beta_sigma">
          {' '}
          Sigmas Only
        </Link>
        <Link className="dropdown-item" to="/profiles/orginization/zeta_phi_beta">
          {' '}
          Zetas Only
        </Link>
      </div>
      </li>
    </ul>
    )

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/hiring">
            Jobs
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/feed">
            Post
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/businesses">
            Businesses
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/podcasts">
            Podcasts
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/blogs">
            Blogs
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          {navProfileLink}
  
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {profileImage} {nameDisplay}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="collapse" data-target="#mobile-nav">
            {profileLink}
            {editProfileLink}
            {createProfileLink}
            {sendEmail}
            {adminPage}
            <Link to="/account" className="dropdown-item ">
              <i className="fas fa-user-circle text-royal mr-1"></i>
            Account
            </Link>
            <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="dropdown-item "
          >
         <i className="fa fa-times text-royal mr-1"></i>
            Logout
          </a>
          </div>
        </li>
      </ul>
    );
 
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target="#mobile-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
 
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-royal mb-4">
        <div className="container fancy-border">
            <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
            </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">

            {isAuthenticated ? inNetworkLinks : <ul></ul>}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
 
Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  user: state.user,
});
 
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getCurrentProfile})(Navbar);