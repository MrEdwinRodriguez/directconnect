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
    if (this.props.business && this.props.business.length != 0) {
        business = this.props.business.map(bus => (
            <tr key={bus._id}>
                <td>{bus.name}</td>
                <td>{bus.title}</td>
                <td>{bus.website}</td>
                <td>{bus.location}</td>
                <td><Link to={`/profile/business/${bus._id}`} className="btn btn-primary">
                Edit</Link>
                </td>
                <td><button onClick={this.onDeleteClick.bind(this, bus._id)} className='btn btn-danger'>Delete</button></td>   
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