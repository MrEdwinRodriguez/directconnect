import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import { uploadProfileImage } from "../../actions/profileActions";
class ProfileHeader extends Component {

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        if (!this.state.selectedFile) {
            return false;
        }
        fd.append('file', this.state.selectedFile, this.state.selectedFile.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        this.props.uploadProfileImage(fd, config, this.props.history)
        .then(() => {this.setState({
            selectedFile: null
        })})

    }

        render() {
            const { profile } = this.props;
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

        return (
            <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-royal text-white mb-3">
                <div className="row">
                    <div className="col-4 col-md-3 m-auto">
                        {profile.profileImage ? <img className="rounded-circle"  src={profile.profileImage} alt="profile image" /> :  <img className="rounded-circle" src={profile.user.avatar} alt="no image" /> }
                    </div>
                </div>
                <div className='row'>
                <div className="col-4 col-md-4 m-auto">
                    <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" multiple accept='image/*' className="custom-file-input"  id="inputGroupFile01" onChange={this.fileSelectedHandler} />
                                <label className="custom-file-label" >{fileName}</label>
                            </div>
                            <div className='input-group-append'>
                                <span className="input-group-text" onClick={this.fileUploadHandler}>Upload</span>
                            </div>
                        </div>
                    </div>
                
                
                </div>
                <div className="text-center">
                    <h3 className="display-5 text-center">{profile.user.name}</h3>
                    <p className="lead text-center">{profile.title} {isEmpty(profile.company) ? null : (<span>@ {profile.company}</span>)}</p>
                    {isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}
                    <p className="lead text-center">{profile.user.email}</p>
                    <p>
                        {isEmpty(profile.website) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-globe fa-2x" />
                        </a>
                        )}
                        {isEmpty(profile.social && profile.social.twitter) ? null : (
                        <a
                            className="text-white p-2"
                            href={profile.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
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
                        >
                            <i className="fab fa-youtube fa-2x" />
                        </a>
                        )}

                    </p>
                    <p>Looking for: </p>
                    <p>{profile.lookingFor} Position</p>
                    <p>Hiring: </p>
                    <ul className="list-group list-group-flush">
                    {hiringFor} 
                    </ul>
                </div>
                </div>
            </div>
            </div>
        )
  }
}


const mapStateToProops = state => ({

})

export default connect(mapStateToProops, {uploadProfileImage})(withRouter(ProfileHeader));