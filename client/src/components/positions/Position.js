import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
// import { getProfiles, getPositionById } from '../../actions/profileActions';
import { getPositionById } from '../../actions/hiringActions';


class Profiles extends Component {
    
    componentDidMount () {
        this.props.getPositionById(this.props.match.params.id)
    }
  render() {
    const { position, loading } = this.props.position;
    console.log(this)
    

    let positionItem;

    if(position === null || loading) {
        positionItem = <Spinner />
    } else {
        if(position) {
            // positionItem = profiles.map(profile => (
            //     <ProfileItem key={p._id} profile={profile} />
            // ))
            positionItem = 
            <div className='card card-body bg-light mb-3'>
            <div className='row'>
              <div className='col-lg-6 cold-md-4 col-8'>
                <h3>{position.position}</h3>
                <p>Company: {position.company}</p>
                <p>Location: {position.location}</p>
                <p>Pay: {position.pay} {position.frequency}</p>
                <hr></hr>
                <p><strong>Contact</strong> </p>
                <p>{position.contactName? 'Name: ' + position.contactName : ''}</p>
                <p>{position.email ? 'Email: ' + position.email : ''}</p>
                <p>{position.phoneNumber ? 'Phone Number: ' + position.phoneNumber : ''}</p>
              </div>
              <div className='col-md-6 d-none d-md-block'>
                <h4>Description</h4>
                <p>{position.description}</p>
              </div>
            </div>
        </div>      
   
        } else {
            positionItem = <h4>No Position Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Blue and White Profiles</h1>
                        <p className="lead text-center">
                        Browse and Connect with Zetas and Sigmas
                        </p>
                        {positionItem}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

Profiles.propTypes = {
    getPositionById: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    position: state.position

})

export default connect(mapStateToProps, {getPositionById})(Profiles);