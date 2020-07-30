import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions';
import { FaEdit, FaCommentDots} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';

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
    let postImage =  "/blank.png"; 
    if (comment.profile && comment.profile.profileImage ) {
      if (comment.profile.profileImage) {
        postImage = comment.profile.profileImage;
      } 
    } 
    return ( 
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 centerImage text-center">
            <a href="profile.html">
              <img
                className="rounded-circle commentImage centerImage"
                src={postImage}
                alt=""
              />
            </a>
            <br />
            {makeNameLink}
            <div className="text-center">
            {comment.user._id === auth.user.id || comment.user === auth.user.id? (
              <div>
                <span className='margin-10'>
                <Link to={`/post/comment/edit/${comment._id}`} className='text-black margin-10' ><FaEdit  size={20}/></Link>
                </span>
              <span
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className='margin-10'
              >
                <BsTrashFill size={20}/>
              </span>
               </div>
            ) : null}
            </div>
          </div>
          <div className="col-md-10">
            <p className="lead btn-light" >{comment.text}</p>
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