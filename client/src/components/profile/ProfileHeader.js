import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaWindowClose, FaBlog, FaPodcast} from 'react-icons/fa';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import { uploadProfileImage, deleteProfileImage } from "../../actions/profileActions";
class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageHovered: false,
            selectedFile: null,
            errors: {},
        };
    
        this.showDelete = this.showDelete.bind(this);
        this.hideDelete = this.hideDelete.bind(this);
        this.deleteProfileImage = this.deleteProfileImage.bind(this);
      }

    upload() {
        document.getElementById("inputGroupFile01").click()
      }

    showDelete() {
        this.setState({
            imageHovered: true
        })
    }
    hideDelete() {
        this.setState({
            imageHovered: false
        })
    }

    deleteProfileImage(){
        var profileId = {
            profileId : this.props.profile._id
        }
        this.props.deleteProfileImage(profileId);
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

        render() {
            const { profile, auth } = this.props;            
            let fileName = "Update Profile Image";
            let lookginFor = "";
            let hiringFor = "";
        
            if (this.state.selectedFile) {
                fileName = this.state.selectedFile.name;
            }

            if (profile.lookginFor) {
                lookginFor = profile.lookginFor.map( looking => (
                    <li><Link to={`/position/${looking._id}`} className="list-group-item profile zoom">
                        {looking.position}</Link>
                    </li>
                ))
            }
        
            if (profile.hiringFor) {
                hiringFor = profile.hiringFor.map( hire => (
                    <li key={hire._id}><Link to={`/position/${hire._id}`} className="list-group-item profile zoom">
                        {hire.position}</Link>
                    </li>
                ))
            }

            let isProfileUser = <div></div>
            if (profile && profile.user && (profile.user._id+"" == auth.user.id+"" || profile.user+"" == auth.user.id+"" )) {
                isProfileUser = <button id='uploadImage' className="btn btn-light custom-button-size"  onClick={this.upload}>Update Profile Image</button>
            }

            let imageUrl = <img className="rounded-circle" src="/blank.png"  alt="no image" />;
            if (profile.profileImage) {
                imageUrl = <img src={profile.profileImage} className="rounded-circle"  alt="profile image" onMouseEnter={this.showDelete} />
            }
            let deleteButton = <div></div>
            if (this.state.imageHovered) {
                deleteButton = <span className='deleteImage' ><FaWindowClose  size={20} onClick={this.deleteProfileImage}/></span>
            }
        return (
            <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-royal text-white mb-3">
                    <div className="row pad-10">
                        <div className="col-4 col-md-3 m-auto" onMouseLeave={this.hideDelete}>
                            {deleteButton}
                            {imageUrl}
                        </div>
                    </div>
                <div className='row'>
                    <div className="col-8 col-md-4 m-auto height-35">
                        <div className="input-group mb-3 text-center">
                            <div className="col text-center no-padding">
                                {isProfileUser}
                                <input id="inputGroupFile01" hidden type="file" onChange={this.fileSelectedHandler} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="display-5 text-center">{profile && profile.user ? profile.user.name : ""}</h3>
                    <p className="lead text-center">{profile.title} {isEmpty(profile.company) ? null : (<span>@ {profile.company}</span>)}</p>
                    {isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}
                    <p className="lead text-center">{profile && profile.user ? profile.user.email : ""}</p>
                    <p>
                        {profile.website || profile.blog || profile.podcast || (profile.social && (profile.social.twitter || profile.social.instagram || profile.social.facebook || profile.social.youtube || profile.social.linkedin)) ? <p>Links: </p> : ""}
                        {profile.website ? (
                        <a
                            className="text-white p-2"
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="website"
                        >
                            <i className="fas fa-globe fa-2x" />
                        </a>
                        ): null}
                    {isEmpty(profile.blog) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="blog"
                        >
                        <FaBlog  className="mb15" size={32} />
                        </a>
                        )}
                    {isEmpty(profile.podcast) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.podcast}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="podcast"
                        >
                            <FaPodcast  className="mb15" size={32} />
                        </a>
                        )}
                        {isEmpty(profile.social && profile.social.twitter) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="twitter"
                        >
                            <i className="fab fa-twitter fa-2x" />
                        </a>
                        )}

                        {isEmpty(profile.social && profile.social.linkedin) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="linkedin"
                        >
                            <i className="fab fa-linkedin fa-2x" />
                        </a>
                        )}

                        {isEmpty(profile.social && profile.social.facebook) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="facebook"
                        >
                            <i className="fab fa-facebook fa-2x" />
                        </a>
                        )}

                        {isEmpty(profile.social && profile.social.instagram) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="instagram"
                        >
                            <i className="fab fa-instagram fa-2x" />
                        </a>
                        )}

                        {isEmpty(profile.social && profile.social.youtube) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tip data-for="youtube"
                        >
                            <i className="fab fa-youtube fa-2x" />
                        </a>
                        )}

                    </p>
                    
                    {profile.lookingFor ? <p>Looking for: </p> : ""}
                    {profile.lookingFor ? <p>{profile.lookingFor} Position</p> : ""}
                    {hiringFor && hiringFor.length > 0 ? <p>Hiring: </p> : "" }
                    <ul className="list-group list-group-flush">
                    {hiringFor} 
                    </ul>
                    <ReactTooltip id="website" place="top" effect="solid">
                        Website
                    </ReactTooltip>
                    <ReactTooltip id="blog" place="top" effect="solid">
                        Blog
                    </ReactTooltip>
                    <ReactTooltip id="podcast" place="top" effect="solid">
                        Podcast
                    </ReactTooltip>
                    <ReactTooltip id="linkedin" place="top" effect="solid">
                        LinkedIn
                    </ReactTooltip>
                    <ReactTooltip id="facebook" place="top" effect="solid">
                        Facebook
                    </ReactTooltip>
                    <ReactTooltip id="instagram" place="top" effect="solid">
                        Instagram
                    </ReactTooltip>
                    <ReactTooltip id="twitter" place="top" effect="solid">
                        Twitter
                    </ReactTooltip>
                    <ReactTooltip id="youtube" place="top" effect="solid">
                        YouTube
                    </ReactTooltip>
                </div>
                </div>
            </div>
            </div>
        )
  }
}


const mapStateToProops = state => ({
    auth: state.auth,
})

export default connect(mapStateToProops, {uploadProfileImage, deleteProfileImage})(withRouter(ProfileHeader));