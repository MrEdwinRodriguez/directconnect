import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import DatePickerGroup from '../../common/DatePickerGroup';
import formatDate from '../../../validation/formatDate';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { getCurrentProfile, getExperience, addExperience, updateExperience } from "../../../actions/profileActions";
import isEmpty from '../../../validation/is-empty';
import '../../../css/style.css';

class EditExperience extends Component {
    constructor(props) {
      super(props);
      this.state = {
        company: '',
        title: '',
        location: '',
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
          currentExperience.to = !isEmpty(currentExperience.to) ? currentExperience.to : "";
          currentExperience.description = !isEmpty(currentExperience.description) ? currentExperience.description : "";

          this.setState({
            company: currentExperience.company,
            title: currentExperience.title,
            location: currentExperience.location,
            from: formatDate(currentExperience.from),
            to: formatDate(currentExperience.to),
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
          from: this.state.fromDate ? this.state.fromDate : this.state.from,
          to: this.state.toDate ? this.state.toDate : this.state.to,
          current: this.state.current,
          description: this.state.description
        };
      this.props.updateExperience(this.props.match.params.exp, expData, this.props.history);
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
