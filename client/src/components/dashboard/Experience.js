import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from "../../actions/profileActions";
import { Link } from 'react-router-dom';


class Experience extends Component {
    onDeleteClick (id) {
        this.props.deleteExperience(id);
    }

  render() {
    let experience = null;
    if (this.props.experience && this.props.experience.length > 0) {
        experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td width="30%">{exp.company}</td>
                <td width="30%">{exp.title}</td>
                <td width="20%">
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                {exp.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}

                </td>
                <td width="10%"><Link to={`/profile/experience/${exp._id}`} className="btn btn-bw-blue">
                Edit</Link>
                </td>
                <td width="10%"><span onClick={this.onDeleteClick.bind(this, exp._id)}><i className="fa fa-trash fa-lg pad-top-10" aria-hidden="true"></i></span></td>
            </tr>

        ))
    } else {
            experience = 
            <tr>
                <td>You have not added any experience</td>
            </tr>
        }
    return (
      <div>
          <h4 className='mb-4'>Experience Credentials</h4>
          <table className='table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Years</th>
                </tr>
            </thead>
            <tbody>
                {experience}
            </tbody>
          </table>
        
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);