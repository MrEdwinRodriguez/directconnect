import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from './../../actions/profileActions';
import { updateCurrentUser, getCurrentUser } from './../../actions/authActions';
import '../../css/style.css';



class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
          add_chapter: false,
          edit_chapter: false,
          add_officer: false,
          edit_officer: false,
          errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    componentDidMount() {
      this.props.getCurrentUser();
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors || !nextProps.education) {
          this.setState({ errors: nextProps.errors });
      }

    }
  
    onSubmit(e) {
      e.preventDefault();
      const accountData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          name: this.state.first_name + " " + this.state.last_name,
          id: this.state.id,
      }
  
      this.props.updateCurrentUser(accountData);
    }
  
    onChange(e) {
      if (this.props.auth.success) {
        this.props.auth.success = false;
      }
      this.setState({ [e.target.name]: e.target.value });
    }
  



    render() {
      const { errors } = this.state;

      if (this.state.updated) {
        setTimeout(this.updated, 5000)
      }
      return (
        <div className="add-business">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Admin</h1>
                <ul class="list-group">
                    <li class="list-group-item">Add Chapter</li>
                        { this.state.add_chapter ? <div className= "alert alert-success">BUILD ADD CHAPTER HERE</div> : <div></div>}
                    <li class="list-group-item">Edit Chapters</li>
                        { this.state.edit_chapters ? <div className= "alert alert-success">BUILD EDIT CHAPTERS HERE</div> : <div></div>}
                    <li class="list-group-item">Edit Chapter Officers</li>
                        { this.state.add_officers ? <div className= "alert alert-success">BUILD ADD OFFICERS HERE</div> : <div></div>}
                    <li class="list-group-item">Send Email</li>
                        { this.state.edit_officers ? <div className= "alert alert-success">BUILD EDIT OFFICERS HERE</div> : <div></div>}
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  Admin.propTypes = {
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
    withRouter(Admin )
  );