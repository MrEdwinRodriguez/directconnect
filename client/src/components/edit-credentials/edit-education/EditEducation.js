import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import DatePickerGroup from '../../common/DatePickerGroup';
import formatDate from '../../../validation/formatDate';
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
            fromDate: '',
            to: '',
            toDate: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
          };
    
        this.onChange = this.onChange.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.onChangeFrom = this.onChangeFrom.bind(this);
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
         currentEducation.to = !isEmpty(currentEducation.to) ? currentEducation.to : "";
         currentEducation.description = !isEmpty(currentEducation.description) ? currentEducation.description : "";
         console.log(currentEducation) 
         this.setState({
            school: currentEducation.school,
            degree: currentEducation.degree,
            fieldofstudy: currentEducation.fieldofstudy,
            from: formatDate(currentEducation.from),
            to: currentEducation.to ? formatDate(currentEducation.to) : "",
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
          from: this.state.fromDate ? this.state.fromDate : this.state.from,
          to: this.state.toDate ? this.state.toDate : this.state.to,
          current: this.state.current,
          description: this.state.description
        };
        console.log(eduData)
      this.props.updateEducation(this.props.match.params.edu, eduData, this.props.history);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    onChangeFrom(e) {
      this.setState({ from: formatDate(e) });
      this.setState({ fromDate: new Date(e) });
    }
    onChangeTo(e) {
      this.setState({ to: formatDate(e) });
      this.setState({ toDate: new Date(e) });
    }
  
    onCheck(e) {
      this.setState({
        disabled: !this.state.disabled,
        current: !this.state.current
      });
    }
  
    render() {
        const { errors, current } = this.state;
        let toDate = null;
        let displayToDate = this.state.current;
  
        if(!displayToDate) {
          toDate = (
              <div>
                    <h6 className='toMargin'>To Date</h6>
                    <DatePickerGroup
                      name="to"
                      placeholder="MM/YYYY"
                      value={this.state.to}
                      onChange={this.onChangeTo}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                    />
              </div>
          )
      }
    
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
                    <DatePickerGroup
                      name="from"
                      placeholder="MM/YYYY"
                      value={this.state.from}
                      onChange={this.onChangeFrom}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
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
