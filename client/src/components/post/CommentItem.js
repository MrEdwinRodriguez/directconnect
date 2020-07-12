import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    let makeNameLink =  <p className="text-center">{comment.user.name}</p>
    if ( comment.profile && comment.profile.handle ) {
     makeNameLink =  <p className="text-center"><Link to={`/profile/${comment.profile.handle}`}>{comment.user.name}</Link></p>
    }
    return ( 
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 centerImage">
            <a href="profile.html">
              <img
                className="rounded-circle imageResize centerImage"
                src={comment.profile && comment.profile.profileImage ? comment.profile.profileImage : "/blank.png"}
                alt=""
              />
            </a>
            <br />
            {makeNameLink}
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user._id === auth.user.id || comment.user === auth.user.id? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);