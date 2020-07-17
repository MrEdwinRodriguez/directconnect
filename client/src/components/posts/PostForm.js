import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import '../../css/style.css';
import isEmpty from '../../validation/is-empty';


class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmitPost = this.onSubmitPost.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onSubmitPost(e) {
        e.preventDefault();
        const { user} = this.props.auth;
        const { profile } = this.props.profile;
        if(!profile._id) {
            this.state.errors = 'You must create a profile to create a post.  Visit your dashboard to create a profile';
            this.setState({ errors: {text:  "You must create a profile to create a post.  Visit your dashboard to create a profile"} })
            return false;
        }
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: profile.profileImage ? profile.profileImage : "/blank.png",
        };
        this.props.addPost(newPost);
        if (this.state.text.length < 5) {
            this.state.errors = 'Post must be between 5';
        } else if (isEmpty(this.state.text)) {
         this.state.errors = 'Text field is required';
         } else {
            this.setState({ text: ""})
         }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


  render() {
    const { errors } = this.state;

    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-royal text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmitPost}>
              <div className="form-group">
                <TextAreaFieldGroup 
                placeholder="Create a post"
                name='text'
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
})

export default  connect(mapStateToProps, {addPost})(PostForm);