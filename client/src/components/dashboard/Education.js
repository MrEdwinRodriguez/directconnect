import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from "../../actions/profileActions";
import { Link } from 'react-router-dom';
import { FaEdit} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deleteId: "",
            errors: {},
        };
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onExitHover = this.onExitHover.bind(this);
        this.onHoverEdit = this.onHoverEdit.bind(this);
        this.onExitEditHover = this.onExitEditHover.bind(this);

      }

    onOpenModal (id) {
        this.setState({showModal: true});
        this.setState({deleteId: id});
    }
    onDelete () {
        this.props.deleteEducation(this.state.deleteId);
        this.setState({showModal: false});
        this.setState({deleteId: ""});
    }
    onCancel () {
        this.setState({showModal: false});
        this.setState({deleteId: ""});
    }
    onHover (e) {
        this.setState(prevState => ({
            deleteIsHover: true
        }));
    }
    onExitHover (e) {
        this.setState(prevState => ({
            deleteIsHover: false
        }));
    }
    onHoverEdit (e) {
        this.setState(prevState => ({
            editIsHover: true
        }));
    }
    onExitEditHover (e) {
        this.setState(prevState => ({
            editIsHover: false
        }));
    }
  render() {
    let education = null;
    const deleteHover = this.state.deleteIsHover ? 24 : 20;
    const editHover = this.state.editIsHover ? 24 : 20;
    if (this.props.education && this.props.education.length > 0) {
        education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td width="30%">{edu.school}</td>
                <td width="30%">{edu.degree}</td>
                <td width="20%">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>
                <td width="10%"><Link to={`/profile/education/${edu._id}`} className='text-black' onMouseEnter={this. onHoverEdit} onMouseLeave={this.onExitEditHover}>
                <FaEdit size={editHover}/></Link>
                </td>  
                <td width="10%"><span onMouseEnter={this.onHover} onMouseLeave={this.onExitHover} onClick={this.onOpenModal.bind(this, edu._id)}><BsTrashFill size={deleteHover}/></span></td>
            </tr>

        ))
    } else {
            education = 
            <tr>
                <td>You have not added any experience</td>
            </tr>
        }
    let modal = ""
    if (this.state.showModal && this.props.education) {
        let educations = this.props.education;
        let deleteEducation = null;
        educations .forEach(education => {
            if(education._id == this.state.deleteId) {
                deleteEducation = education;
            }
        });
        modal = 
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to delete this Education?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>You are deleting <strong>{deleteEducation.degree}</strong> in <strong>{deleteEducation.fieldofstudy}</strong> from <strong>{deleteEducation.school}</strong>  from your profile.</p>
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
          {modal}
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