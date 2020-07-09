import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from "../../actions/profileActions";
import { Link } from 'react-router-dom';
import { FaEdit} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';
import { GrFormAdd } from 'react-icons/gr'
import '../../css/style.css';

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
    let education = null;
    if (this.props.education && this.props.education.length > 0) {
        education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td width="30%">{edu.school}</td>
                <td width="30%">{edu.degree}</td>
                <td width="20%">
                <Moment format="MM/YYYY">{edu.from}</Moment> -
                {edu.current === true ? (' Current') : <Moment format="MM/YYYY">{edu.to}</Moment>}
                </td>
                <td width="10%" ><Link onMouseEnter={this.onHoverEdit.bind(this, edu._id)} onMouseLeave={this.onExitEditHover.bind(this, edu._id)} to={`/profile/education/${edu._id}`} className='text-black'>
                <FaEdit id={`edit-${edu._id}`} size={20}/></Link>
                </td>  
                <td width="10%"><span onMouseEnter={this.onHoverDelete.bind(this, edu._id)} onMouseLeave={this.onExitHoverDelete.bind(this, edu._id)} onClick={this.onOpenModal.bind(this, edu._id)}><BsTrashFill id={`delete-${edu._id}`} className='zoom' size={20}/></span></td>
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
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Education</button>
                        <button type="button" className="btn btn-secondary"  onClick={this.onCancel} data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    }
    return (
      <div>
          {modal}
          <div className='container'>
              <div className='row'>
                    <div className="col-6 col-sm-4">
                        <h4 className='mb-4'>Education Credentials</h4>
                    </div>
                    <div className="col-6 col-sm-3">
                        <Link to="/add-education" type="button" className="btn">
                        <GrFormAdd className="raise_add" size={24}/>
                        Add Education</Link>
                    </div>
              </div>
          </div>
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