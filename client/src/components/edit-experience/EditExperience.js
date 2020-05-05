import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getCurrentProfile, getExperience, addExperience, updateExperience } from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';

class EditExperience extends Component {
    constructor(props) {
      super(props);
      this.state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCheck = this.onCheck.bind(this);
    }
  
    componentDidMount() {
      if (this.props.match.params.exp) {
        this.props.getExperience(this.props.match.params.exp);
      }
      this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors || !nextProps.experience) {
        this.setState({ errors: nextProps.errors });
      }
      if(nextProps && nextProps.experience && nextProps.experience.experience) {
          const currentExperience = nextProps.experience.experience;
         currentExperience.to = !isEmpty(currentExperience.to) ? formatDate(currentExperience.to) : "";
         currentExperience.description = !isEmpty(currentExperience.description) ? currentExperience.description : "";

         function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
        }

          this.setState({
            company: currentExperience.company,
            title: currentExperience.title,
            location: currentExperience.location,
            from: formatDate(currentExperience.from),
            to: currentExperience.to,
            current: currentExperience.current,
            description: currentExperience.description
        })

      }
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const expData = {
          company: this.state.company,
          title: this.state.title,
          location: this.state.location,
          from: this.state.from,
          to: this.state.to,
          current: this.state.current,
          description: this.state.description
        };
      this.props.updateExperience(this.props.match.params.exp, expData, this.props.history);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onCheck(e) {
      this.setState({
        disabled: !this.state.disabled,
        current: !this.state.current
      });
    }
  
    render() {
      // same as const errors = this.state.errors
      const { errors } = this.state;
      let toDate = null;
      let displayToDate = this.state.current;

      if(!displayToDate) {
        toDate = (
            <div>
                  <h6>To Date</h6>
                  <TextFieldGroup
                      name="to"
                      type="date"
                      value={this.state.to}
                      onChange={this.onChange}
                      error={errors.to}
                      disabled={this.state.disabled ? 'disabled' : ''}
                  />
            </div>
        )
    }

      return (
        <div className="add-experience">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Edit Experience</h1>
                <p className="lead text-center">
                  Add any job or position that you have had in the past or current
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                  />
                  <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                  {toDate}
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className="form-check-label">
                      Current Job
                    </label>
                  </div>
                  <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about the the position"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-royal text-white btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

EditExperience.propTypes = {
    getExperience:  PropTypes.func.isRequired,
    updateExperience: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    addExperience:  PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    experience: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProops = state => ({
    profile: state.profile,
    experience: state.experience,
    errors: state.errors,
})


export default connect(mapStateToProops, {getCurrentProfile, updateExperience,  getExperience, addExperience})(withRouter(EditExperience));
