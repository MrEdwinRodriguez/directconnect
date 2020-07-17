import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles, getProfilesByOrginization, getProfilesBySearchCriteria } from '../../actions/profileActions';


class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            update: false,
            errors: {},
          };
        this.searchClicked = this.searchClicked.bind(this);
        this.searchChanged = this.searchChanged.bind(this);
      }

    componentDidMount () {
        let path = window.location.pathname.split("/")
        let index = path.length -1;
        let org = path[index]
        if(org == 'phi_beta_sigma' || org =='zeta_phi_beta') {
            this.props.getProfilesByOrginization(org)
        } else {
            this.props.getProfiles();
        }
        if(this.props.match.params.orginization !== undefined) {
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
    componentWillUpdate() {
        console.log(this)
    }
    searchChanged (e) {
        this.setState({search: e.target.value})
    }
    searchClicked(e) {
        if (this.state.search != "") {
            this.props.getProfilesBySearchCriteria(this.state.search)
        } else {
            this.props.getProfiles();  
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
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Job Title or Keywords" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={ this.searchChanged }></input>
                            <div className="input-group-append">
                                <button type='button' className="input-group-text" id="search" onClick={this.searchClicked}>search</button>
                            </div>
                       </div>  
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
    getProfilesBySearchCriteria: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles, getProfilesByOrginization, getProfilesBySearchCriteria })(Profiles);