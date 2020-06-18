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
    let hiring = null;
    if (this.props.hiring && this.props.hiring.length !== 0) {
        hiring = this.props.hiring.map(hire => (
            <tr key={hire._id}>
                <td width="25%">{hire.position}</td>
                <td width="25%">{hire.company}</td>
                <td width="15%">{hire.location}</td>
                <td width="15%">{hire.pay}</td>
                <td width="10%"><Link to={`/profile/edit-hiring/${hire._id}`} className="btn btn-bw-blue">
                Edit</Link>
                </td>
                <td width="10%"><span onClick={this.onDeleteClick.bind(this, hire._id)}><i className="fa fa-trash fa-lg pad-top-10" aria-hidden="true"></i></span></td> 
            </tr>

        ))
    } else {
        hiring = 
        <tr>
            <td>You have not added a position</td>
        </tr>
    }
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