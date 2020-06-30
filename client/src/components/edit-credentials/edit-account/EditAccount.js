import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../../actions/profileActions';
import { updateCurrentUser, getCurrentUser } from '../../../actions/authActions';
import '../../../css/style.css';



class EditAccount extends Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name: '',
          last_name: '',
          id: '',
          showDeleteModal: false,
          deleteId: "",
          errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onCancel = this.onCancel.bind(this);
    }
  
    componentDidMount() {
      this.props.getCurrentUser();
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors || !nextProps.education) {
          this.setState({ errors: nextProps.errors });
      }
      if(nextProps && nextProps.auth && nextProps.auth.user) {
          let user = nextProps.auth.user;
          this.setState({
              first_name: user.first_name,
              last_name: user.last_name,
              id: user._id
        })
  
      }
    }
  
    onSubmit(e) {
      e.preventDefault();
      const accountData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          name: this.state.first_name + " " + this.state.last_name,
          id: this.state.id
      }
  
      this.props.updateCurrentUser(accountData);
    }
  
    onChange(e) {
      if (this.props.auth.success) {
        this.props.auth.success = false;
      }
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onCheck(e) {
      this.setState({
        disabled: !this.state.disabled,
        current: !this.state.current
      });
    }
    onOpenModal (id) {
      this.setState({showDeleteModal: true});
      this.setState({deleteId: id});
    }

    onDelete () {
      this.setState({showDeleteModal: false});
      this.setState({deleteId: ""});
      this.props.deleteAccount();
    }

    onCancel () {
      console.log(this)
        this.setState({showDeleteModal: false});
        this.setState({deleteId: ""});
    }

  
    render() {
      const { errors } = this.state;

      let modal = ""
      if (this.state.showDeleteModal ) {
          modal = 
          <div className="" id="businessModal" role="dialog">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Are you sure you want to delete your Account?</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                          <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          <p>This will permanently delete your account.</p>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Account</button>
                          <button type="button" className="btn btn-secondary"  onClick={this.onCancel} data-dismiss="modal">Cancel</button>
                      </div>
                  </div>
              </div>
          </div>
      }
      return (
        <div className="add-business">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                { this.props.auth.success ? <div className= "alert alert-success">Name has been updated.</div> : <div></div>}
                <h1 className="display-4 text-center">Account</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                      placeholder="First Name"
                      name='first_name'
                      value={this.state.first_name}
                      onChange={this.onChange}
                      error={errors.businessName}
                      info="First Name."/>
                  <TextFieldGroup 
                      placeholder="Last Name"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.onChange}
                      error={errors.businessTitle}
                      info="Last Name."/>
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-royal btn-block text-white mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
          {modal}
          <div className='center' style={{marginTop: '100px'}} >
            <button onClick={this.onOpenModal.bind(this, this.props.auth.user.id)} className='btn  btn-info'>
                Delete My Account
            </button>
          </div>
        </div>
      );
    }
  }
  
  EditAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    updateCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { deleteAccount, updateCurrentUser, getCurrentUser})(
    withRouter(EditAccount )
  );
