import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile} from '../../../actions/profileActions';
import { getBusiness, updateBusiness } from '../../../actions/businessActions';



class EditBusiness extends Component {
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

  componentDidMount() {
    if (this.props.match.params.bus) {
      this.props.getBusiness(this.props.match.params.bus);
    }
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors || !nextProps.education) {
        this.setState({ errors: nextProps.errors });
    }
    if(nextProps && nextProps.business && nextProps.business.business) {
        const currentBusiness = nextProps.business.business;
        console.log(currentBusiness)
        this.setState({
            businessName: currentBusiness.name,
            businessTitle: currentBusiness.title,
            description: currentBusiness.description,
            location: currentBusiness.location,
            website: currentBusiness.website
      })

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

    this.props.updateBusiness(this.props.match.params.bus, businessData, this.props.history);
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
              <h1 className="display-4 text-center">Edit Business</h1>
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
                    value={this.state.description}
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

EditBusiness.propTypes = {
  getBusiness: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateBusiness: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  business: state.business,
  errors: state.errors
});

export default connect(mapStateToProps, {getBusiness, getCurrentProfile, updateBusiness})(
  withRouter(EditBusiness )
);
