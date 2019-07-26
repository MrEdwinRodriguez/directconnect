import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBusiness } from "../../actions/profileActions";


class Business extends Component {
    onDeleteClick (id) {
        this.props.deleteBusiness(id);
    }

  render() {

    const business = this.props.business.map(aBusiness => (
        <tr key={aBusiness._id}>
            <td>{aBusiness.name}</td>
            <td>{aBusiness.title}</td>
            <td>{aBusiness.website}</td>
            <td>{aBusiness.location}</td>
            <td><button onClick={this.onDeleteClick.bind(this, aBusiness._id)} className='btn btn-danger'>Delete</button></td>   
        </tr>

    ))
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