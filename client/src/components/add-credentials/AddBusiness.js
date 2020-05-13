import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBusiness } from '../../actions/businessActions';

class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
        businessName: '',
        businessTitle: '',
        description: '',
        location: '',
        website: '',
        errors: {},
    };

    this.onChange = this.onChange.bind(this);
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
    const businessData = {
        title: this.state.businessTitle,
        name: this.state.businessName,
        description: this.state.businessDescription,
        location: this.state.location,
        website: this.state.website,
    }

    this.props.addBusiness(businessData, this.props.history);
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
      <div className="add-business">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Business</h1>
              <p className="lead text-center">
                Add any Businesses that you own or are a part of.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                    placeholder="Name"
                    name='businessName'
                    value={this.state.businessName}
                    onChange={this.onChange}
                    error={errors.businessName}
                    info="Your Business Name."/>
                <TextFieldGroup 
                    placeholder="Title"
                    name="businessTitle"
                    value={this.state.businessTitle}
                    onChange={this.onChange}
                    error={errors.businessTitle}
                    info="Your business title in your company."/>
                <TextFieldGroup 
                    placeholder="Description"
                    name="businessDescription"
                    value={this.state.businessDescription}
                    onChange={this.onChange}
                    error={errors.businessDescription}
                    info="What is your service/product?"/>
                <TextFieldGroup 
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Company location."/>
                <TextFieldGroup 
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Company website."/>
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

AddBusiness.propTypes = {
  addBusiness: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addBusiness})(
  withRouter(AddBusiness )
);
