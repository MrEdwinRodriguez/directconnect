import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Spinner from "../common/Spinner";
import { getPost, editPost } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';


class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            post: "",
            avatar: "",
            user: {},
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmitPost = this.onSubmitPost.bind(this);
    }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  componentWillReceiveProps(newProps) {

    if (newProps.errors || !newProps.hire) {
        this.setState({ errors: newProps.errors });
      }
    if(newProps && newProps.post  && newProps.post.text)  {
        // console.log(newProps)
        this.setState({
            text: newProps.post.text,
            avatar: newProps.post.avatar ? newProps.post.avatar : "",
            user: newProps.post.user
      })
  
    }
}

onSubmitPost(e) {
    e.preventDefault();

    // const { profile } = this.props.profile;
    // if(!profile._id) {
    //     this.state.errors = 'You must create a profile to create a post.  Visit your dashboard to create a profile';
    //     this.setState({ errors: {text:  "You must create a profile to create a post.  Visit your dashboard to create a profile"} })
    //     return false;
    // }
    const editPost = {
        text: this.state.text,
    };

    this.props.editPost(this.props.match.params.id, editPost, this.props.history);

    if (this.state.text.length < 5) {
        this.state.errors = 'Post must be between 5';
    } else if (isEmpty(this.state.text)) {
     this.state.errors = 'Text field is required';
     } else {
        this.setState({ text: ""})
     }

}
onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if(post === null || loading ) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
            <h3 className="text-center">Edit Post</h3>
            <br/>
        </div>
      );
    }

    return (
        <div className="post-form mb-3">
        <h3>Edit Post</h3>
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

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post.post
});

export default connect(mapStateToProps, { getPost, editPost })(Post);