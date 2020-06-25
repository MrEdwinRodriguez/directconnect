import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../../actions/profileActions';
import { updateCurrentUser, getCurrentUser } from '../../../actions/authActions';



class EditAccount extends Component {
    constructor(props) {
      super(props);
      this.state = {
          first_name: '',
          last_name: '',
          id: '',
          errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCheck = this.onCheck.bind(this);
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
  
    render() {
      const { errors } = this.state;
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
