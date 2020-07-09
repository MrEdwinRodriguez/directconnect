import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import DatePickerGroup from '../common/DatePickerGroup';
import formatDate from '../../validation/formatDate';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import '../../css/style.css';

class AddExperience extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.fromDate,
        to: this.state.toDate,
        current: this.state.current,
        description: this.state.description
      };
    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    if (e.target && e.target.name && e.target.value) {
      this.setState({ [e.target.name]: e.target.value });
    }
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
    // same as const errors = this.state.errors
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
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
                <h6>To Date</h6>
                <DatePickerGroup
                  name=""
                  placeholder="MM/YYYY"
                  value={this.state.to}
                  onChange={this.onChangeTo}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                 
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(
  withRouter(AddExperience)
);
