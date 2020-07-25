import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { AiFillDashboard} from 'react-icons/ai';
import { FaEdit} from 'react-icons/fa';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        } 
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found')
        }
    }

  render() {
    const { profile, loading} = this.props.profile;
    const { auth } = this.props;
    let profileContent;
    let backLink = <Link to='/profiles' className="btn btn-light mb-3 float-left">Back To Profiles</Link>
    if (profile && profile.user && auth && auth.user && (profile.user._id+"" == auth.user.id+"" || profile.user+"" == auth.user.id+"" )) {
        backLink = 
        <div><Link to='/dashboard' className="btn btn-light mb-3 float-left mr-1"> <AiFillDashboard size={20}/> To Dashboard</Link>
        <Link to='/edit-profile' className="btn btn-light mb-3 float-left mr-1"><FaEdit size={20}/> Edit Profile</Link>
        </div>
    }
    
    if(profile === null || loading ) {
        profileContent = <Spinner />
    } else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        {backLink}
                    </div>
                    <div className='col-md-6'></div>
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} business={profile.business}/>
            </div>
        )
    }

    return (
      <div className='profile'>
        <div className="containter">
            <div className="row">
                <div className="col-md-12">{profileContent}</div>
            </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);