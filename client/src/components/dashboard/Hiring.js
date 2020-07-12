import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteHiring } from "../../actions/hiringActions";
import { Link } from 'react-router-dom';
import { FaEdit} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';
import { GrFormAdd } from 'react-icons/gr'
import '../../css/style.css';


class Hiring extends Component {
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
        this.props.deleteHiring(this.state.deleteId);
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
    let hiring = null;
    const deleteHover = this.state.deleteIsHover ? 24 : 20;
    const editHover = this.state.editIsHover ? 24 : 20;
    if (this.props.hiring && this.props.hiring.length !== 0) {
        hiring = this.props.hiring.map(hire => (
            <tr key={hire._id}>
                <td width="25%">{hire.position}</td>
                <td width="25%">{hire.company}</td>
                <td width="15%">{hire.location}</td>
                <td width="15%">{hire.pay}</td>
                <td width="10%"><Link to={`/profile/edit-hiring/${hire._id}`} className='text-black' onMouseEnter={this.onHoverEdit.bind(this, hire._id)} onMouseLeave={this.onExitEditHover.bind(this, hire._id)}>
                <FaEdit id={`edit-${hire._id}`} size={editHover}/></Link>
                </td>
                <td width="10%"><span onMouseEnter={this.onHoverDelete.bind(this,hire._id)} onMouseLeave={this.onExitHoverDelete.bind(this,hire._id)} onClick={this.onOpenModal.bind(this, hire._id)}><BsTrashFill id={`delete-${hire._id}`} size={deleteHover}/></span></td> 
            </tr>

        ))
    } else {
        hiring = 
        <tr>
            <td>You have not added a position</td>
        </tr>
    }
    let modal = ""
    if (this.state.showModal && this.props.hiring) {
        let positions = this.props.hiring;
        let deletePosition = null;
        positions .forEach(position => {
            if(position._id == this.state.deleteId) {
                deletePosition = position;
            }
        });
        modal = 
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to delete this Position?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>You are deleting <strong>{deletePosition.position}</strong> at <strong>{deletePosition.company}</strong> from your profile.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Hiring For</button>
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
                        <h4 className='mb-4'>I am Hiring for...</h4>
                    </div>
                    <div className="col-6 col-sm-3">
                        <Link to="/add-hiring" type="button" className="btn">
                        <GrFormAdd className="raise_add" size={24}/>
                        Add Hiring For</Link>
                    </div>
              </div>
            </div>
            <div className='container'>
                <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th width="25%">Position</th>
                                <th width="25%">Company</th>
                                <th width="15%">Location</th>
                                <th width="15%">Pay</th>
                                <th width="10%"></th>
                                <th width="10%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hiring}
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
    )
  }
}

Hiring.propTypes = {
    deleteHiring: PropTypes.func.isRequired
}

export default connect(null, {deleteHiring})(Hiring);