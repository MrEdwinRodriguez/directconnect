import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBusiness } from "../../actions/businessActions";
import { Link } from "react-router-dom";


class Business extends Component {
    onDeleteClick (id) {
        this.props.deleteBusiness(id);
    }

  render() {
    var  business = null;
    if (this.props.business && this.props.business.length !== 0) {
        business = this.props.business.map(bus => (
            <tr key={bus._id}>
                <td width="25%">{bus.name}</td>
                <td width="25%">{bus.title}</td>
                <td width="15%">{bus.website}</td>
                <td width="15%">{bus.location}</td>
                <td width="10%"><Link to={`/profile/business/${bus._id}`} className="btn btn-bw-blue">
                Edit</Link>
                </td>
                <td width="10%"><span onClick={this.onDeleteClick.bind(this, bus._id)}><i className="fa fa-trash fa-lg pad-top-10" aria-hidden="true"></i></span></td>  
            </tr>

        ))
    } else {
        business = 
        <tr>
            <td>You have not added a business</td>
        </tr>
    }
    console.log(business)
    return (
      <div>
          <h4 className='mb-4'>Businesses</h4>
          <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Website</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {business}
            </tbody>
          </table>
        
      </div>
    )
  }
}

Business.propTypes = {
    deleteBusiness: PropTypes.func.isRequired
}

export default connect(null, {deleteBusiness})(Business);