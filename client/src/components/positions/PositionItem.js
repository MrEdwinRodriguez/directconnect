import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';

class PositionItem extends Component {
  render() {
    const { position } = this.props;


    return (
      <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-lg-6 cold-md-4 col-8'>
              <h3>{position.position}</h3>
              <p>Company: {position.company}</p>
              <p>Location: {position.location}</p>
              <p>Pay: {position.pay}</p>
              <p>Contact: {position.contactName} / {position.contactEmail} / {position.contactPhone } </p>
              <div className="alternativeButton">
              <Link to={`/position/${position._id}`} className="btn btn-info mr-1">
              Read More
              </Link>
              </div>
            
            </div>
            <div className='col-md-6 d-none d-md-block'>
              <h4>Description</h4>
              <p>{position.description}</p>
              <Link to={`/position/${position._id}`} className="btn btn-info mr-1">
              Read More
            </Link>
            </div>
          </div>
      </div>
    )
  }
}

PositionItem.propTypes = {
  position: PropTypes.object.isRequired
}

export default PositionItem;