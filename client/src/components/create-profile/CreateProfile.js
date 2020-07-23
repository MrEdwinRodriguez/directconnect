import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { uploadCreateProfileImage } from "../../actions/profileActions";
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
            hasBlog: false,
            blogName: "",
            blogLink: "",
            blogAbout: "",
            hasPodcast: false,
            podcastName: "",
            podcastLink: "",
            podcastAbout: "",
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
            selectedFile: null,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onCheckPodcast = this.onCheckPodcast.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onUpload() {
        document.getElementById("inputGroupFile01").click()
      }
    fileSelectedHandler = event => {
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
        this.props.uploadCreateProfileImage(fd, config, this.props.history)
        this.setState({
            selectedFile: null
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: "",
        }); 
        if(this.state.hasBlog) {
            if(!this.state.blogName) {
                this.setState({
                    errors: {
                        blogName: 'Blog Name is Required'
                    },
                  });
                  return false
            }
            if(!this.state.blogLink) {
                this.setState({
                    errors: {
                        blogLink: 'Blog Link is Required'
                    },
                  });
                  return false
            }
        }
        if(this.state.hasPodcast) {
            if(!this.state.podcastName) {
                this.setState({
                    errors: {
                        podcastName: 'Podcast Name is Required'
                    },
                  });
                  return false
            }
            if(!this.state.podcastLink) {
                this.setState({
                    errors: {
                        podcastLink: 'Podcast Link is Required'
                    },
                });
                return false
            }
        }
        const profileData = {
            handle: this.state.handle.replace(/\s/g, 'f/'),
            company: this.state.company,
            website: this.state.website,
            hasBlog: this.state.hasBlog,
            blogName: this.state.blogName,
            blogLink: this.state.blogLink,
            blogAbout: this.state.blogAbout,
            hasPodcast: this.state.hasPodcast,
            podcastName: this.state.podcastName,
            podcastLink: this.state.podcastLink,
            podcastAbout: this.state.podcastAbout,
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

        //temp adding it here instead initially in profileDate object because it may cause issues.  to move later
        if (this.props.profile.imageURL) {
            profileData.profileImage = this.props.profile.imageURL 
        }

        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck(e) {
        this.setState({
          hasBlog: !this.state.hasBlog,
        });
      }
      onCheckPodcast(e) {
        this.setState({
          hasPodcast: !this.state.hasPodcast,
        });
      }

  render() {
    const { errors, displaySocialInputs, displayLooking } = this.state;
    const { inviteCode } = this.props.auth.user;
    const profileObj = this.props.profile;

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

    let imageUrl = <img className="rounded-circle" src="/blank.png"  alt="no image" />;
    if (profileObj && profileObj.imageURL) {
        imageUrl = <img src={profileObj.imageURL} className="rounded-circle"  alt="profile image" />
    }
    let displayBlog = this.state.hasBlog;
    let blogInputs = null;
    if(displayBlog) {
      blogInputs = (
          <div className="contentInput">
          <TextFieldGroup 
          placeholder="Blog Name"
          name='blogName'
          value={this.state.blogName}
          onChange={this.onChange}
          error={errors.blogName}
          info="Name of your Personal Blog."/>
      <TextFieldGroup 
          placeholder="Blog Link"
          name='blogLink'
          value={this.state.blogLink}
          onChange={this.onChange}
          error={errors.blogLink}
          info="Link to you Personal Blog."/>
      <TextFieldGroup 
          placeholder="Blog Description"
          name='blogAbout'
          value={this.state.blogAbout}
          onChange={this.onChange}
          error={errors.blogAbout}
          info="Short Description of your Personal Blog."/>
          </div>
      )
  }

  let displayPodcast = this.state.hasPodcast;
  let podcastInputs = null;
  if(displayPodcast) {
  podcastInputs = (
        <div className="contentInput">
        <TextFieldGroup 
        placeholder="Podcast Name"
        name='podcastName'
        value={this.state.podcastName}
        onChange={this.onChange}
        error={errors.podcastName}
        info="Name of your Personal Podcast."/>
    <TextFieldGroup 
        placeholder="Podcast Link"
        name='podcastLink'
        value={this.state.podcastLink}
        onChange={this.onChange}
        error={errors.podcastLink}
        info="Link to you Personal Podcast."/>
    <TextFieldGroup 
        placeholder="Podcast Description"
        name='podcastAbout'
        value={this.state.podcastAbout}
        onChange={this.onChange}
        error={errors.podcastAbout}
        info="Short Description of your Personal Podcast."/>
        </div>
    )
}
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
                    <div className="form-check mb-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasBlog"
                        value={this.state.hasBlog}
                        checked={this.state.hasBlog}
                        onChange={this.onCheck}
                        id="hasBlog"
                    />
                    <label htmlFor="hasBlog" className="form-check-label">
                        Do you have a blog?
                    </label>
                    </div>
                    {blogInputs}
                    <div className="form-check mb-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="hasBlog"
                        value={this.state.hasPodcast}
                        checked={this.state.hasPodcast}
                        onChange={this.onCheckPodcast}
                        id="hasPodcast"
                    />
                    <label htmlFor="hasPodcast" className="form-check-label">
                        Do you have a Podcast?
                    </label>
                    </div>
                    {podcastInputs}
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
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProops, {createProfile, uploadCreateProfileImage})(withRouter(CreateProfile));