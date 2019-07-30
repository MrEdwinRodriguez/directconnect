import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addHiring } from '../../actions/profileActions';

class AddHiring extends Component {
  constructor(props) {
    super(props);
    this.state = {
        company: '',
        position: '',
        description: '',
        location: '',
        pay: '',
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
    const hiringData = {
        company: this.state.company,
        position: this.state.position,
        description: this.state.description,
        location: this.state.location,
        pay: this.state.pay,
    }

    this.props.addHiring(hiringData, this.props.history);
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
              <h1 className="display-4 text-center">Hiring For...</h1>
              <p className="lead text-center">
                Add any position you or somebody you know is hiring for.
              </p>
              <p className="text-center">(Where you can help get somebody into the door.)</p>
              {/* <small className="d-block pb-3">* = required fields</small> */}
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Company you are hiring for."/>
              <TextFieldGroup 
                    placeholder="Position"
                    name='position'
                    value={this.state.position}
                    onChange={this.onChange}
                    error={errors.position}
                    info="Position you are hiring."/>
                <TextFieldGroup 
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Company location."/>
                <TextFieldGroup 
                    placeholder="Pay"
                    name="pay"
                    value={this.state.pay}
                    onChange={this.onChange}
                    error={errors.pay}
                    info="How much does this position pay."/>
                <TextAreaFieldGroup
                    placeholder="Description"
                    name='description'
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Describe the position you are hiring for."/>
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

AddHiring.propTypes = {
  addHiring : PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addHiring })(
  withRouter(AddHiring )
);
