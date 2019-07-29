import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from "../../actions/profileActions";
// import { deletePost, addLike, removeLike } from '../../actions/postActions';
import '../../css/style.css';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            displayLooking: false,
            handle: '',
            company: '',
            title: '',
            orginization: '',
            chapter: '',
            website: '',
            locations: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(e) {
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            title: this.state.title,
            orginization: this.state.orginization,
            chapter: this.state.chapter,
            skills: this.state.skills,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            lookingFor: this.state.lookingFor
        }

        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    const { errors, displaySocialInputs, displayLooking } = this.state;
    const { inviteCode } = this.props.auth.user;

    let socialInputs;
    let lookingFor;

    if(displayLooking){
        lookingFor = (
            <div>
                <TextFieldGroup 
                    placeholder="Looking for..."
                    name='lookingFor'
                    value={this.state.lookingFor}
                    onChange={this.onChange}
                    // error={errors.title}
                    info="What position are you looking for?"/>
            </div>
        )
    }
    if(displaySocialInputs){
        socialInputs = (
            <div>
                <InputGroup 
                    placeholder="LinkedIn Profile URL"
                    name='linkedin'
                    icon= "fab fa-linkedin"
                    value = {this.state.linkedin}
                    onChange = {this.onChange}
                    error = {errors.linkedin}
                />
                <InputGroup 
                    placeholder="Facebook Profile URL"
                    name='facebook'
                    icon= "fab fa-facebook"
                    value = {this.state.facebook}
                    onChange = {this.onChange}
                    error = {errors.facebook}
                />
                <InputGroup 
                    placeholder="Twitter Profile URL"
                    name='twitter'
                    icon= "fab fa-twitter"
                    value = {this.state.twitter}
                    onChange = {this.onChange}
                    error = {errors.twitter}
                />
                 <InputGroup 
                    placeholder="Youtube Channel URL"
                    name='youtube'
                    icon= "fab fa-youtube"
                    value = {this.state.youtube}
                    onChange = {this.onChange}
                    error = {errors.youtube}
                />
                <InputGroup 
                    placeholder="Instagram Profile URL"
                    name='instagram'
                    icon= "fab fa-instagram"
                    value = {this.state.instagram}
                    onChange = {this.onChange}
                    error = {errors.instagram}
                />
            </div>
        )
    }

    var orginizations = [];
    var chapters = [];
    switch (inviteCode) {
        case "iotarho1978":
            orginizations = [
                {label: "Phi Beta Sigma", value: "phi_beta_sigma"},
            ];
            chapters = [
                {label: "Iota Rho", value: "iota_rho"},
                {label: "Gamma Delta Sigma", value: "gamma_delta_sigma"},
            ];
          break;
        case "sigmaepsilon1978":
            orginizations = [
                    {label: "Zeta Phi Beta", value: "zeta_phi_beta"}
                ];
            chapters = [
                {label: "Sigma Epsilon", value: "sigma_epsilon"},
                {label: "Epsilon Zeta Zeta", value: "epsilon_zeta_zeta"}
            ];
          break;
        default:
          orginizations = [
                {label: "* Orginization", value: 0},
                {label: "Phi Beta Sigma", value: "phi_beta_sigma"},
                {label: "Zeta Phi Beta", value: "zeta_phi_beta"}
            ];
            chapters = [
                {label: "* Chapters", value: 0},
                {label: "Iota Rho", value: "iota_rho"},
                {label: "Gamma Delta Sigma", value: "gamma_delta_sigma"},
                {label: "Sigma Epsilon", value: "sigma_epsilon"},
                {label: "Epsilon Zeta Zeta", value: "epsilon_zeta_zeta"}
            ];
      }

    //select options for status
    const options = [
        {label: "* Select Proffesional Status", value: 0},
        {label: "Professional (8 + years experience)", value: "Professional-Senior"},
        {label: "Professional (3-7 years experience)", value: "Professional-Mid"},
        {label: "Professional (0-3 years experience)", value: "Professional-Junior"},
        {label: "Teacher/Instructor", value: "teacher"},
        {label: "Business Owner", value: "owner"},
        {label: "Intern", value: "Intern"},
        {label: "Graduate Student", value: "Graduate"},
        {label: "Undergrad Student", value: "Undergrad"},
        {label: "Other", value: "Other"},
    ];


    return (
      <div className='create-profile'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center'>Create Your Profile</h1>
                    <p className='lead text-center'>
                        Let's get some information to better connect with your peers. 
                    </p>
                    <small className='d-block pb-3'>* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                        placeholder="* Profile Handle"
                        name='handle'
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL."/>
                    <SelectListGroup 
                        placeholder="Status"
                        name='status'
                        value={this.state.status}
                        onChange={this.onChange}
                        options={options}
                        error={errors.status}
                        info="Give an idea of where you are at in your primary career path."/>
                    <TextFieldGroup 
                        placeholder="Title"
                        name='title'
                        value={this.state.title}
                        onChange={this.onChange}
                        error={errors.title}
                        info="Give us your professional title"/>
                    <SelectListGroup 
                        placeholder="Orginization"
                        name='orginization'
                        value={this.state.orginization}
                        onChange={this.onChange}
                        options={orginizations}
                        error={errors.orginization}
                        info="What orginization did you pledge?"/>
                     <SelectListGroup 
                        placeholder="Chapter"
                        name='chapter'
                        value={this.state.chapter}
                        onChange={this.onChange}
                        options={chapters}
                        error={errors.chapter}
                        info="What chapter did you pledge?"/>
                    <TextFieldGroup 
                        placeholder="Company"
                        name='company'
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Your company or the company you work for."/>
                    <TextFieldGroup 
                        placeholder="Website"
                        name='website'
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="Personal Website or company website."/>
                    <TextFieldGroup 
                        placeholder="Location"
                        name='location'
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="City or City & State suggested (ex. Orlando, Fl"/>
                    <TextFieldGroup 
                        placeholder="* Skills"
                        name='skills'
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="Please use comma seperated values (ex. Javascript, SQL, Quickbooks, Fluent in Spanish "/>
                    <TextAreaFieldGroup
                        placeholder="Short Bio"
                        name='bio'
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us about yourself, your experience and your goals"/>
                    <div className="mb-3">
                        <button 
                            type='button'
                            onClick={() => {
                            this.setState(prevState => ({
                                displaySocialInputs: !prevState.displaySocialInputs
                            }))
                        }}
                        className="btn btn-light">Add Social Media Links</button>
                        <span className='text-muted'>  Optional</span>
                    </div>
                    {socialInputs}
                    <div className="mb-3">
                        <button 
                            type='button'
                            onClick={() => {
                            this.setState(prevState => ({
                                displaySocialInputs: !prevState.displaySocialInputs
                            }))
                        }}
                        className="btn btn-light">Add Business</button>
                        <span className='text-muted'>  Optional</span>
                    </div>
                    {socialInputs}
                    <div className="mb-3">
                        <button 
                            type='button'
                            onClick={() => {
                            this.setState(prevState => ({
                                displayLooking: !prevState.displayLooking
                            }))
                        }}
                        className="btn btn-light">Looking for a job</button>
                        <span className='text-muted'>  Optional</span>
                    </div>
                    {lookingFor}
                    <input type='submit' value="Submit" className="btn btn-royal text-white btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProops = state => ({
    profile: state.profile,
    auth: state.auth ,
    errors: state.errors
})

export default connect(mapStateToProops, {createProfile})(withRouter(CreateProfile));