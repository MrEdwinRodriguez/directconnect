import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { getBusiness } from '../../actions/businessActions';


class Business extends Component {
   
    componentDidMount () {
        this.props.getBusiness(this.props.match.params.business)
    }
  render() {
    const { business, loading } = this.props.business;
    console.log(this)
    

    let businessItem;

    if(business === null) {
        businessItem = <Spinner />
    } else {
        if(business) {
            // businessItem = profiles.map(profile => (
            //     <ProfileItem key={p._id} profile={profile} />
            // ))
            businessItem = 
            <div className='card card-body bg-light mb-3'>
            <div className='row'>
              <div className='col-lg-6 cold-md-4 col-8'>
                <h3>{business.business}</h3>
                <p>Company: {business.name}</p>
                <p>Location: {business.location}</p>
                <p>website: {business.website}</p>
                <hr></hr>
                <p><strong>Contact</strong></p>
                <p>{business.contactName ? 'Name: ' + business.contactName : ''}</p>
                <p>{business.email ? 'Email: ' + business.email : ''}</p>
                <p>{business.phoneNumber ? 'Phone Number: ' + business.phoneNumber : ''}</p>
              </div>
              <div className='col-md-6'>
                <h4>Description</h4>
                <p>{business.description ? business.description: "No description added yet"}</p>
              </div>
            </div>
        </div>      
   
        } else {
            businessItem = <h4>No Business Found...</h4>
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/businesses" className="btn btn-light mb-3">Back To Businesses</Link>
                        <h1 className="display-4 text-center">Blue and White Profiles</h1>
                        <p className="lead text-center">
                        Support Businesses owned by Sigmas and Zetas
                        </p>
                        {businessItem}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Business.propTypes = {
    getBusiness: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    business: state.business

})

export default connect(mapStateToProps, {getBusiness})(Business);