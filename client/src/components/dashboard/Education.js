import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from "../../actions/profileActions";
import { Link } from 'react-router-dom';

class Education extends Component {
    onDeleteClick (id) {
        this.props.deleteEducation(id);
    }

  render() {
    let education = null;
    if (this.props.education && this.props.education.length > 0) {
        education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td width="30%">{edu.school}</td>
                <td width="30%">{edu.degree}</td>
                <td width="20%">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>
                <td width="10%"><Link to={`/profile/education/${edu._id}`} className="btn btn-bw-blue">
                Edit</Link>
                </td>  
                <td width="10%"><span onClick={this.onDeleteClick.bind(this, edu._id)}><i className="fa fa-trash fa-lg pad-top-10" aria-hidden="true"></i></span></td>
            </tr>

        ))
    } else {
            education = 
            <tr>
                <td>You have not added any experience</td>
            </tr>
        }
    
    return (
      <div>
          <h4 className='mb-4'>Education Credentials</h4>
          <table className='table'>
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                </tr>
            </thead>
            <tbody>
                {education}
            </tbody>
          </table>
        
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);