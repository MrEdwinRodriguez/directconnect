import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';
import Business from './Business';
import Hiring from './Hiring';
import '../../css/style.css';


class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
      this.props.deleteAccount();
    }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    console.log(profile)
    if(profile === null || loading) {
      dashboardContent = <Spinner/>
    } else {
      // check if logged in user has profile data
      if(Object.keys(profile).length > 0){
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>
            {user.first_name} {user.last_name}</Link>
            </p>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <Business business={profile.business}/>
            <Hiring hiring={profile.hiringFor}/>
            <div className='mt-5 p-4 text-center small-text'>
              <p className='mb-0'>Blue and White Connect was created out of the Love for Blue and White.</p>
              <p> Please consider making a small donation to help with server and storage cost to maintain the site.</p>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="Y2Z75S945U8VE" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </div>
        );
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.first_name} {user.last_name} </p>
            <p>You have not yet set up a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-royal text-white">Create Profile</Link>
            <div className='mt-5 p-4 text-center small-text'>
              <p className='mb-0'>Blue and White Connect was created out of the Love for Blue and White.</p>
              <p> Please consider making a small donation to help with server and storage cost to maintain the site.</p>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="Y2Z75S945U8VE" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">          
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default  connect(mapStateToProps, { getCurrentProfile})(Dashboard);