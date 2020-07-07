import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onSubmitComment(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;
        const { profile } = this.props.profile;
        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: isEmpty(profile.profileImage) ? "/blank.png" : profile.profileImage
        };

        this.props.addComment(postId, newComment);
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
            Comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmitComment}>
              <div className="form-group">
                <TextAreaFieldGroup 
                placeholder="Reply to post"
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile, 
    errors: state.errors
})

export default  connect(mapStateToProps, {addComment})(CommentForm);