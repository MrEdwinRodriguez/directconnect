import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class BusinessItem extends Component {
  render() {
    const { business } = this.props;
    return (
      <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-lg-6 cold-md-4 col-8'>
              <h3>{business.name}</h3>
              <p>Location: {business.location}</p>
              <p>Website: {business.website}</p>
              <p>Contact: {business.contactName} / {business.contactEmail} / {business.contactPhone } </p>
              <div className='alternativeButton'>
                <Link to={`/business/${business._id}`} className="btn btn-info mr-1">
                  Read More
                </Link>
              </div>
            </div>
            <div className='col-md-6 d-none d-md-block'>
              <h4>Description</h4>
              <p>{business.description}</p>
              <Link to={`/business/${business._id}`} className="btn btn-info mr-1">
              Read More
            </Link>
            </div>
          </div>
      </div>
    )
  }
}

BusinessItem.propTypes = {
  position: PropTypes.object.isRequired
}

export default BusinessItem;