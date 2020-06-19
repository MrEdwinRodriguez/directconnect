import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBusiness } from "../../actions/businessActions";
import { Link } from "react-router-dom";
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

  render() {
    var  business = null;
    if (this.props.business && this.props.business.length !== 0) {
        business = this.props.business.map(bus => (
            <tr key={bus._id}>
                <td width="25%">{bus.name}</td>
                <td width="25%">{bus.title}</td>
                <td width="15%">{bus.website}</td>
                <td width="15%">{bus.location}</td>
                <td width="10%"><Link to={`/profile/business/${bus._id}`} className="btn btn-bw-blue">
                Edit</Link>
                </td>
                <td width="10%"><span onClick={this.onOpenModal.bind(this, bus._id)}><i className="fa fa-trash fa-lg pad-top-10" aria-hidden="true"></i></span></td>  
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