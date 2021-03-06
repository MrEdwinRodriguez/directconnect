import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import logo from './../../img/logo-transparent.png'
import '../../css/style.css';
 
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
 
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="display-3 mb-4 landing-logo">
                  <img src={logo} alt="Logo" />
                </div>
                <p className="lead lead-add-on">
                  {' '}
                  Create a profile.... then Network, become a mentor, become a mentee, support other Zetas and Sigmas.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-royal text-white mr-2 lead-add-on">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light lead-add-on">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
  auth: state.auth
});
 
export default connect(mapStateToProps)(Landing);