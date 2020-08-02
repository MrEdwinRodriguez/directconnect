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
          commentNotification: true,
          chapterNotification: true,
          localChaptersNotification: true,
          fullNetworkNotification: true, 
          showDeleteModal: false,
          deleteId: "",
          errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.chapterNotification = this.chapterNotification.bind(this);
      this.localChaptersNotification = this.localChaptersNotification.bind(this);
      this.fullNetworkNotification = this.fullNetworkNotification.bind(this);
      this.commentNotification = this.commentNotification.bind(this);
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
          let commentNotification = user.commentNotification != null && user.commentNotification != undefined ? user.commentNotification : true;
          let chapterNotification= user.chapterNotification != null ? user.chapterNotification : true;
          let localChaptersNotification = user.localChaptersNotification != null? user.localChaptersNotification : true;
          let fullNetworkNotification = user.fullNetworkNotification != null ? user.fullNetworkNotification : true;
          if (user.email_permissions) {
            if(user.email_permissions.commentNotification != null && user.email_permissions.commentNotification != undefined)
              commentNotification = user.email_permissions.commentNotification
            if(user.email_permissions.chapterNotification!= null && user.email_permissions.chapterNotification!= undefined)
              chapterNotification = user.email_permissions.chapterNotification;
            if(user.email_permissions.localChaptersNotification != null && user.email_permissions.localChaptersNotification != undefined)
              localChaptersNotification = user.email_permissions.localChaptersNotification;
            if(user.email_permissions.fullNetworkNotification != null && user.email_permissions.fullNetworkNotification != undefined)
              fullNetworkNotification = user.email_permissions.fullNetworkNotification;

          }
          this.setState({
              first_name: user.first_name,
              last_name: user.last_name,
              id: user._id,
              commentNotification: commentNotification,
              chapterNotification: chapterNotification,
              localChaptersNotification: localChaptersNotification,
              fullNetworkNotification: fullNetworkNotification, 

        })
  
      }
    }
  
    onSubmit(e) {
      e.preventDefault();
      const accountData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          name: this.state.first_name + " " + this.state.last_name,
          id: this.state.id,
          commentNotification: this.state.commentNotification,
          chapterNotification: this.state.chapterNotification,
          localChaptersNotification: this.state.localChaptersNotification,
          fullNetworkNotification: this.state.fullNetworkNotification,
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

    chapterNotification(checked) {
      this.setState({ chapterNotification : !this.state.chapterNotification });
    }
    localChaptersNotification(checked) {
      this.setState({ localChaptersNotification : !this.state.localChaptersNotification });
    }
    fullNetworkNotification(checked) {
      this.setState({ fullNetworkNotification : !this.state.fullNetworkNotification });
    }
    commentNotification(checked) {
      this.setState({ commentNotification : !this.state.commentNotification });
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
                { this.props.auth.success ? <div className= "alert alert-success">Account has been updated.</div> : <div></div>}
                <h1 className="display-4 text-center">Account</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                <span><h4>Name</h4></span>
                <hr></hr>
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
                  <span><h4>Email Preferences</h4></span>
                  <hr></hr>
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="chapterNotification" onChange={this.chapterNotification} checked={this.state.chapterNotification} />
                    <label className="custom-control-label" for="chapterNotification">Chapter Notifications</label>
                  </div>
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="localChapterNotification" onChange={this.localChaptersNotification} checked={this.state.localChaptersNotification} />
                    <label className="custom-control-label" for="localChapterNotification">Local Chapter Notifications (if more than one chapter in your area)</label>
                  </div>
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="fullNetworkNotification" onChange={this.fullNetworkNotification} checked={this.state.fullNetworkNotification} />
                    <label className="custom-control-label" for="fullNetworkNotification">Full Network Notifications</label>
                  </div>
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="commentNotification" onChange={this.commentNotification} checked={this.state.commentNotification}  />
                    <label className="custom-control-label" for="commentNotification">Comment Notifications (weekly notice if somebody comments on a post you wrote)</label>
                  </div>
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
