import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles, getProfilesByOrginization } from '../../actions/profileActions';


class Profiles extends Component {
    componentDidMount () {
        if(this.props.match.params.orginization) {
            this.props.getProfilesByOrginization(this.props.match.params.orginization)
        } else {
            this.props.getProfiles();
        }
        if(this.props.match.params.orginization != undefined) {
            switch (this.props.match.params.orginization) {
            case "phi_beta_sigma":
                document.getElementById("network").innerHTML = "Sigma Profiles" ;
            break;
            case "zeta_phi_beta":
                document.getElementById("network").innerHTML = "Zeta Profiles" ;
            break;
            default:
                document.getElementById("network").innerHTML = "Blue and White Profile" ;
            }
        } 
        
    }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;

    if(profiles === null || loading) {
        profileItems = <Spinner />
    } else {
        if(profiles.length > 0) {
            profileItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))
        } else {
            profileItems = <h4>No Profiles Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center" id='network'>Blue and White Profiles</h1>
                        <p className="lead text-center">
                        Browse and Connect with Zetas and Sigmas
                        </p>
                        {profileItems}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getProfilesByOrginization: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles, getProfilesByOrginization })(Profiles);