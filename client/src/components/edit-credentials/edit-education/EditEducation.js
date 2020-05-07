import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import InputGroup from '../../common/InputGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import { getCurrentProfile, getEducation, addExperience, updateEducation } from "../../../actions/profileActions";
import isEmpty from '../../../validation/is-empty';
import '../../../css/style.css';

class EditEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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
      if (this.props.match.params.edu) {
        this.props.getEducation(this.props.match.params.edu);
      }
      this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors || !nextProps.education) {
        this.setState({ errors: nextProps.errors });
      }
      if(nextProps && nextProps.education && nextProps.education.education) {
          const currentEducation = nextProps.education.education;
         currentEducation.to = !isEmpty(currentEducation.to) ? formatDate(currentEducation.to) : "";
         currentEducation.description = !isEmpty(currentEducation.description) ? currentEducation.description : "";
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
            school: currentEducation.school,
            degree: currentEducation.degree,
            fieldofstudy: currentEducation.fieldofstudy,
            from: formatDate(currentEducation.from),
            to: currentEducation.to,
            current: currentEducation.current,
            description: currentEducation.description
        })

      }
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const eduData = {
          school: this.state.school,
          degree: this.state.degree,
          fieldofstudy: this.state.fieldofstudy,
          from: this.state.from,
          to: this.state.to,
          current: this.state.current,
          description: this.state.description
        };
      this.props.updateEducation(this.props.match.params.edu, eduData, this.props.history);
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
    
        return (
          <div className="add-education">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <Link to="/dashboard" className="btn btn-light">
                    Go Back
                  </Link>
                  <h1 className="display-4 text-center">Edit Education</h1>
                  <small className="d-block pb-3">* = required fields</small>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="* School"
                      name="school"
                      value={this.state.school}
                      onChange={this.onChange}
                      error={errors.school}
                    />
                    <TextFieldGroup
                      placeholder="* Degree or Certification"
                      name="degree"
                      value={this.state.degree}
                      onChange={this.onChange}
                      error={errors.degree}
                    />
                    <TextFieldGroup
                      placeholder="Field of Study"
                      name="fieldofstudy"
                      value={this.state.fieldofstudy}
                      onChange={this.onChange}
                      error={errors.fieldofstudy}
                    />
                    <h6>From Date</h6>
                    <TextFieldGroup
                      name="from"
                      type="date"
                      value={this.state.from}
                      onChange={this.onChange}
                      error={errors.from}
                    />
                    <h6>To Date</h6>
                    <TextFieldGroup
                        name="to"
                        type="date"
                        value={this.state.to}
                        onChange={this.onChange}
                        error={errors.to}
                        disabled={this.state.disabled ? 'disabled' : ''}
                    />
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
                        Currently Attending
                      </label>
                    </div>
                    <TextAreaFieldGroup
                      placeholder="Program Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                      info="Tell us about the program that you were in"
                    />
                    <input
                      type="submit"
                      value="Submit"
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

EditEducation.propTypes = {
    getEducation:  PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    education: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProops = state => ({
    profile: state.profile,
    education: state.education,
    errors: state.errors,
})


export default connect(mapStateToProops, {getCurrentProfile, updateEducation,  getEducation})(withRouter(EditEducation));
