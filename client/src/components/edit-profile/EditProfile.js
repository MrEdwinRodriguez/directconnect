import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import correctStorageURL from '../../validation/correctStorageURL';
import { uploadProfileImage } from "../../actions/profileActions";
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            displayLooking: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            selectedFile: null,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            //Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');
            
            //if profile field does not exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : "";
            profile.website = !isEmpty(profile.website) ? profile.website : "";
            profile.location = !isEmpty(profile.location) ? profile.location : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
            // profile.lookingFor = !isEmpty(profile.bio) ? profile.bio : "";

            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

            //set component field state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                phoneNumber: profile.phoneNumber,
                status: profile.status,
                title: profile.title,
                orginization: profile.orginization,
                chapter: profile.chapter,
                skills: skillsCSV,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                lookingFor: profile.lookingFor
            })

        }
    }
    onUpload() {
        document.getElementById("inputGroupFile01").click()
      }
    fileSelectedHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
        const fd = new FormData();
        fd.append('file', event.target.files[0], event.target.files[0].name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        this.props.uploadProfileImage(fd, config, this.props.history)
        this.setState({
            selectedFile: null
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle.replace(/\s/g, '_'),
            company: this.state.company,
            title: this.state.title,
            orginization: this.state.orginization,
            chapter: this.state.chapter,
            phoneNumber: this.state.phoneNumber,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
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
    const { errors, displaySocialInputs, displayLooking} = this.state;
    const { profile } = this.props.profile;
    let socialInputs;
    let lookingFor;
    let lookingForButton; 

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
if(!this.state.lookingFor) {
    lookingForButton = (                   
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
    )
} else {
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

    //select options for status
    const options = [
        {label: "* Select Professional Status", value: 0},
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

    var orginizations = [];
    var chapters =[];
    switch (this.state.orginization) {
        case "phi_beta_sigma":
            orginizations = [
                {label: "Phi Beta Sigma", value: "phi_beta_sigma"},
            ];
            chapters = [
                {label: "Iota Rho", value: "iota_rho"},
                {label: "Gamma Delta Sigma", value: "gamma_delta_sigma"},
            ];
          break;
        case "zeta_phi_beta":
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

      let imageUrl = <img className="rounded-circle" src="/blank.png"  alt="no image" />;
      if (profile && profile.profileImage) {
          let newStringURL = correctStorageURL(profile.profileImage)
          imageUrl = <img src={newStringURL} className="rounded-circle"  alt="profile image" />
      }
    return (
      <div className='create-profile'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <Link to="/dashboard" className="btn btn-light">
                    Go Back</Link>
                    <h1 className='display-4 text-center'>Edit Profile</h1>
                    <small className='d-block pb-3'>* = required fields</small>
                    <div className="row pad-10">
                        <div className="col-4 col-md-3 m-auto">
                            {imageUrl}
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-8 col-md-4 m-auto height-35">
                            <div className="input-group mb-3 text-center">
                                    <div className="col text-center no-padding">
                                    <button id='uploadImage' className="btn btn-light custom-button-size"  onClick={this.onUpload}>Update Profile Image</button>
                                        <input id="inputGroupFile01" hidden type="file" onChange={this.fileSelectedHandler} />
                                    </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                        placeholder="* Profile Handle"
                        name='handle'
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL."/>
                    <TextFieldGroup 
                        placeholder="(123)456-7890"
                        name='phoneNumber'
                        type="tel"
                        value={this.state.phoneNumber}
                        onChange={this.onChange}
                        error={errors.phoneNumber}
                        info="Phone Number."/>
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
                        placeholder="Skills"
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
                    {lookingForButton}
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
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProops = state => ({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProops, {createProfile, getCurrentProfile, uploadProfileImage})(withRouter(CreateProfile));