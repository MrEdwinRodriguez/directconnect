import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { editComment, getPostByComment } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';
import '../../css/style.css';


class EditComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            postId: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
    }

    componentDidMount() {
        this.props.getPostByComment(this.props.match.params.id);
      }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
        let comments = newProps.post.comments;
        if (newProps.post && comments) {
            comments.forEach(comment => {
                if(comment._id+"" == newProps.match.params.id+"") {
                this.setState({
                    text: comment.text,
                    postid: this.props.post._id,
                })
                }
            })
        }
    }

    onSubmitComment(e) {
        e.preventDefault();
        const { user } = this.props.auth;
       const postId = this.props.post._id;
       const commentId = this.props.match.params.id
        const { profile } = this.props.profile;
        if(!profile._id) {
            console.log('no profile found')
            this.setState({ errors: {text:  "You must create a profile post a comment.  Visit your dashboard to create a profile"} })
            return false;
        }
        const editComment = {
            text: this.state.text,
            name: user.name,
            avatar: isEmpty(profile.profileImage) ? "/blank.png" : profile.profileImage
        };

        this.props.editComment(commentId, postId, editComment, this.props.history);
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
            Edit Comment...
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

EditComment.propTypes = {
    editComment: PropTypes.func.isRequired,
    getPostByComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile, 
    post: state.post.post,
    errors: state.errors
})

export default  connect(mapStateToProps, {editComment, getPostByComment})(EditComment);