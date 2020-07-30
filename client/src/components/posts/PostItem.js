import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { FaEdit, FaCommentDots} from 'react-icons/fa';
import { BsTrashFill} from 'react-icons/bs';

class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id);
      }

      onLikeClick(id) {
        const { post, auth } = this.props;
        let liked = false;
        let authUser = auth.user.id;
        console.log(this.props)
        console.log(post)
        console.log(authUser)
        post.likes.forEach(like => {
          if(like.user+"" == authUser+"") {
            liked = true;
          }
        })

        if(!liked) {
          this.props.addLike(id);
        } else {
          this.props.removeLike(id);
        }
        
      }

      findUserLike(likes) {
          const { auth } = this.props;

          if(likes.filter(like => like.user === auth.user.id).length) {
            return true;
          } else {
              return false;
          }
      }


  render() {
      const { post, auth, showActions } = this.props;
      let postImage = post.avatar ? post.avatar : "/blank.png"; 
      if (post.profile) {
        let newStringURL = "/blank.png";
        if (post.profile.profileImage) {
          newStringURL = post.profile.profileImage
        } 
        postImage = newStringURL; 
      }
     let userId = post.user._id ? post.user._id : post.user;
     let makeNameLink =  <p className="text-center">{post.name}</p>
     if ( post.profile && post.profile.handle ) {
      makeNameLink = <p className="text-center"><Link to={`/profile/${post.profile.handle}`}>{post.user.name}</Link></p>
     }
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 centerImage text-center">
            <a href="profile.html">
              <img className="rounded-circle postImage centerImage" 
                src={postImage}
                alt="" />
            </a>
            <br />
            {makeNameLink}
            <div className="text-center">
            {userId === auth.user.id ? (
              <div>
                <Link to={`/post/edit/${post._id}`} className='text-black margin-10' ><FaEdit  size={20}/></Link>
                <span onClick={this.onDeleteClick.bind(this, post._id)} type='button' className='text-black margin-10' ><BsTrashFill size={20}/></span>
                </div>
            ) : null}
            </div>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
              Comment  <FaCommentDots  size={30}/>
            </Link>
            {showActions ? (<span> <span onClick={this.onLikeClick.bind(this, post._id)}  className="mr-1">
              <i className={classnames('fas fa-thumbs-up', {
                  'text-info': this.findUserLike(post.likes)
              })}/>
              <span className="badge badge-light">{post.likes.length}</span>
            </span>           
              <p>          
                <Link to={`/post/${post._id}`} >
                {post.comments.length == 1 ? post.comments.length + " Comment " :  post.comments.length + " Comments "} 
              </Link>
            </p></span>) : null}

          </div>
          <div>
          </div>
        </div>
      </div>
        )
  }
}

PostItem.defaultProps = {
  showActions : true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   auth: state.auth 
});
export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);