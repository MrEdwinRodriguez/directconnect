import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { accountResetPassword, getCurrentUser } from '../../../actions/authActions';
import '../../../css/style.css';



class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        updated: false,
        errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.updated = this.updated.bind(this);
    }
  
    componentDidMount() {
      this.props.getCurrentUser();
    }
  
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
      if (nextProps.errors && nextProps.errors.password) {
          this.setState({ errors: {current_password:  nextProps.errors.password} });
      }
      if(nextProps.auth && nextProps.auth.updated) {
        this.setState({ 
            updated: true, 
            current_password: "",
            new_password: "",
            confirm_new_password: "",
            errors: {}
        });
      }
    }
  
    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} })
        if(this.state.current_password.length == 0) {
            this.setState({ errors: {current_password:  "Current password is required"} })
            return false;
        }
        if (this.state.new_password.length < 8) {
            if(this.state.new_password.length == 0) {
                this.setState({ errors: {new_password:  "New password is required"} })
                return false;
            }
            this.setState({ errors: {new_password:  "Password must be at least 8 characters long"} })
            return false;
        }

        if (!/\d/.test(this.state.new_password) || !/[A-Z]/.test(this.state.new_password) || !/[a-z]/.test(this.state.new_password)) {
            if (!/[a-z]/.test(this.state.new_password)) {
                this.setState({ errors: {new_password: "Password must contain at least one lower case letter."}})
            } 
            if (!/[A-Z]/.test(this.state.new_password)) {
                this.setState({ errors: {new_password:  "Password must contain at least one Uppper Case letter"} })
            } 
            if (!/\d/.test(this.state.new_password)) {
                this.setState({ errors: {new_password:  "New Password must contain a number"} })
            }
            return false;
        }
        if(this.state.new_password != this.state.confirm_new_password) {
            this.setState({ errors: {confirm_new_password:  "Password confirm does not match new password"} })
            return false;
        }
        let userId = this.props.auth.user && this.props.auth.user.id ? this.props.auth.user.id : this.props.auth.user._id; 
        const passwordData = {
            currentPassword: this.state.current_password,
            newPassword: this.state.new_password,
            newPasswordConfirm: this.state.confirm_new_password,
            id: userId,
        }
        console.log(passwordData)
  
        this.props.accountResetPassword(passwordData);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    updated () {
      this.setState({updated: false});
    }

    render() {
      const { errors} = this.state;
      const { auth } = this.props;

      let profileLink = <div></div>
      if(auth && auth.user && auth.user.profileHandle) {
          profileLink = <Link to={`/myprofile/${auth.user.profileHandle}`} className="btn btn-light">To Profile </Link>
      }

      if (this.state.updated) {
        setTimeout(this.updated, 5000)
      }
      return (
        <div className="add-business">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/account" className="btn btn-light">
                    To Account
                </Link>
                {profileLink}
                { this.state.updated ? <div className= "alert alert-success">Your password has been changed.</div> : <div></div>}
                <h1 className="display-4 text-center">Reset Password</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                      placeholder="Current Password *"
                      name='current_password'
                      type='password'
                      value={this.state.current_password}
                      onChange={this.onChange}
                      error={errors.current_password}/>
                <TextFieldGroup 
                      placeholder="New Password *"
                      name='new_password'
                      type='password'
                      value={this.state.new_password}
                      onChange={this.onChange}
                      error={errors.new_password}/>
                <TextFieldGroup 
                      placeholder="Confirm New Password *"
                      name='confirm_new_password'
                      type='password'
                      value={this.state.confirm_new_password}
                      onChange={this.onChange}
                      error={errors.confirm_new_password}/>
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-royal btn-block text-white mt-4"
                  />
                </form>
              </div>
            </div>
          </div>

        </div>
      );
    }
  }
  
  ResetPassword .propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    accountResetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, {getCurrentUser, accountResetPassword})(
    withRouter(ResetPassword )
  );
