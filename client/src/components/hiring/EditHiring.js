import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CurrencyGroup from '../common/CurrencyGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getHiring, updateHire, getCurrentProfile } from '../../actions/profileActions';

class EditHiring extends Component {
  constructor(props) {
    super(props);
    this.state = {
        company: '',
        position: '',
        description: '',
        frequency: '',
        location: '',
        pay: '',
        errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onChangePay = this.onChangePay.bind(this);
    this.onChangeFrequency= this.onChangeFrequency.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.hire) {
      this.props.getHiring(this.props.match.params.hire);
    }
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors || !nextProps.hire) {
      this.setState({ errors: nextProps.errors });
    }

    if(nextProps && nextProps.hire && nextProps.hire.hire) {
      const currentPosition = nextProps.hire.hire;
      console.log(currentPosition)
      this.setState({
          company: currentPosition.company,
          position: currentPosition.position,
          description: currentPosition.description,
          frequency: currentPosition.frequency,
          location: currentPosition.location,
          pay: currentPosition.pay
    })

  }

  }

  onSubmit(e) {
    e.preventDefault();
    const hiringData = {
        company: this.state.company,
        position: this.state.position,
        description: this.state.description,
        location: this.state.location,
        frequency: this.state.frequency,
        pay: this.state.pay,
    }
    this.props.updateHire(this.props.match.params.hire, hiringData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangePay(e) {
    const re = /^[0-9.,\b]+$/;
    if(e.target.value.charAt(0) === "$") {
        e.target.value = e.target.value.substring(1)
    }
    if (e.target.value === '' ||  re.test(e.target.value)) {
        this.setState({pay: "$"+e.target.value})
    }
  }
  onChangeFrequency(e) {
    this.setState({frequency: e.target.value});
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
                <CurrencyGroup 
                    placeholder="$10000"
                    name="pay"
                    nameTwo="frequency"
                    value={this.state.pay}
                    valueTwo={this.state.frequency}
                    onChange={this.onChangePay}
                    onChangeTwo={this.onChangeFrequency}
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
                  value="Edit Position"
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

EditHiring.propTypes = {
  getHiring : PropTypes.func.isRequired,
  updateHire: PropTypes.func.isRequired,
  getCurrentProfile : PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  hire: state.hire,
  errors: state.errors
});

export default connect(mapStateToProps, {getHiring, updateHire, getCurrentProfile  })(
  withRouter(EditHiring )
);