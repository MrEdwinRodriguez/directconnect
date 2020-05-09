import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteHiring } from "../../actions/hiringActions";
import { Link } from 'react-router-dom';


class Hiring extends Component {
    onDeleteClick (id) {
        this.props.deleteHiring(id);
    }

  render() {
    const hiring = this.props.hiring.map(hire => (
        <tr key={hire._id}>
            <td>{hire.position}</td>
            <td>{hire.company}</td>
            <td>{hire.location}</td>
            <td>{hire.pay}</td>
            <td><Link to={`/profile/edit-hiring/${hire._id}`} className="btn btn-primary">
              Edit</Link>
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, hire._id)} className='btn btn-danger'>Delete</button></td>   
        </tr>

    ))
    return (
      <div>
          <h4 className='mb-4'>I am Hiring for....</h4>
          <table className='table'>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Pay</th>
                </tr>
            </thead>
            <tbody>
                {hiring}
            </tbody>
          </table>
        
      </div>
    )
  }
}

Hiring.propTypes = {
    deleteHiring: PropTypes.func.isRequired
}

export default connect(null, {deleteHiring})(Hiring);