import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from "../../actions/profileActions";
import { Link } from 'react-router-dom';
import { FaEdit} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';


class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deleteId: "",
            errors: {},
        };
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
      }

    onOpenModal (id) {
        this.setState({showModal: true});
        this.setState({deleteId: id});
    }
    onDelete () {
        this.props.deleteExperience(this.state.deleteId);
        this.setState({showModal: false});
        this.setState({deleteId: ""});
    }
    onCancel () {
        this.setState({showModal: false});
        this.setState({deleteId: ""});
    }
    onHoverDelete (id) {
        document.getElementById('delete-'+id).setAttribute("size", 24)
        document.getElementById('delete-'+id).setAttribute("height", 24)
        document.getElementById('delete-'+id).setAttribute("width", 24)
    }
    onExitHoverDelete (id) {
        document.getElementById('delete-'+id).setAttribute("size", 20)
        document.getElementById('delete-'+id).setAttribute("height", 20)
        document.getElementById('delete-'+id).setAttribute("width", 20)
    }
    onHoverEdit (id) {
        document.getElementById('edit-'+id).setAttribute("size", 24)
        document.getElementById('edit-'+id).setAttribute("height", 24)
        document.getElementById('edit-'+id).setAttribute("width", 24)
    }
    onExitEditHover (id) {
        document.getElementById('edit-'+id).setAttribute("size", 20)
        document.getElementById('edit-'+id).setAttribute("height", 20)
        document.getElementById('edit-'+id).setAttribute("width", 20)
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
                <td width="10%"><Link to={`/profile/experience/${exp._id}`} className='text-black' onMouseEnter={this.onHoverEdit.bind(this, exp._id)} onMouseLeave={this.onExitEditHover.bind(this, exp._id)}>
                <FaEdit id={`edit-${exp._id}`} size={20}/></Link>
                </td>
                <td width="10%"><span onMouseEnter={this.onHoverDelete.bind(this, exp._id)} onMouseLeave={this.onExitHoverDelete.bind(this, exp._id)} onClick={this.onOpenModal.bind(this, exp._id)}><BsTrashFill id={`delete-${exp._id}`} size={20}/></span></td>
            </tr>

        ))
    } else {
            experience = 
            <tr>
                <td>You have not added any experience</td>
            </tr>
        }
    let modal = ""
    if (this.state.showModal && this.props.experience) {
        let experiences = this.props.experience;
        let deleteExperience = null;
        experiences .forEach(experience => {
            if(experience._id == this.state.deleteId) {
                deleteExperience = experience;
            }
        });
        modal = 
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to delete this Experience?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>You are deleting <strong>{deleteExperience.title}</strong> at <strong>{deleteExperience.company}</strong> from your profile.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Business</button>
                        <button type="button" className="btn btn-secondary"  onClick={this.onCancel} data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
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
          {modal}
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);