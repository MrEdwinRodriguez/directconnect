import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBusiness } from "../../actions/businessActions";
import { Link } from "react-router-dom";
import '../../css/style.css';
import { FaEdit} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';
import { GrFormAdd } from 'react-icons/gr'
import '../../css/style.css';


class Business extends Component {
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
        this.props.deleteBusiness(this.state.deleteId);
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
    var  business = null;
    if (this.props.business && this.props.business.length !== 0) {
        business = this.props.business.map(bus => (
            <tr key={bus._id}>
                <td width="25%">{bus.name}</td>
                <td width="25%">{bus.title}</td>
                <td width="15%">{bus.website}</td>
                <td width="15%">{bus.location}</td>
                <td width="10%"><Link to={`/profile/business/${bus._id}`} className='text-black' onMouseEnter={this.onHoverEdit.bind(this, bus._id)} onMouseLeave={this.onExitEditHover.bind(this, bus._id)}>
                <FaEdit id={`edit-${bus._id}`} size={20}/></Link>
                </td>
                <td width="10%"><span onMouseEnter={this.onHoverDelete.bind(this, bus._id)} onMouseLeave={this.onExitHoverDelete.bind(this, bus._id)} onClick={this.onOpenModal.bind(this, bus._id)}><BsTrashFill id={`delete-${bus._id}`} size={20}/></span></td>  
            </tr>

        ))
    } else {
        business = 
        <tr>
            <td>You have not added a business</td>
        </tr>
    }
    let modal = ""
    if (this.state.showModal && this.props.business) {
        let businesses = this.props.business;
        let deleteBusiness = null;
        businesses.forEach(business => {
            if(business._id == this.state.deleteId) {
                deleteBusiness = business;
            }
        });
        modal = 
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure you want to delete this Business?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>You are deleting <strong>{deleteBusiness.name}</strong> from your profile.</p>
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
            <div className='container'>
              <div className='row'>
                    <div className="col-6 col-sm-4">
                        <h4 className='mb-4'>My Businesses</h4>
                    </div>
                    <div className="col-6 col-sm-3">
                        <Link to="/add-business" type="button" className="btn">
                        <GrFormAdd className="raise_add" size={24}/>
                        Add Business</Link>
                    </div>
              </div>
            </div>
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