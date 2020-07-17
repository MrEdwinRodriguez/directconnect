import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../../css/style.css';
import { FaWindowClose} from 'react-icons/fa';
import { getPinned, deletePinned } from '../../actions/postActions';



class PinnedItem extends Component {

  componentDidMount() {
    console.log('here')
    this.props.getPinned();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  deletePinnedMessage (id) {
    this.props.deletePinned(id)
  }
  
  render() {
    const { post } = this.props; 
    console.log('here', post)
    let pinned = [];
    if (post.pinned && post.pinned.length > 0) {
      pinned = post.pinned;
    }
    let pinnedMessages = <div></div>
    if (pinned.length > 0 ) {
      pinnedMessages = pinned.map( pin => (
        <div className='col-md-4' key={pin._id}>
          <div className="card pinnedCard">
          <span className='deletePinned' ><FaWindowClose  size={20} onClick={this.deletePinnedMessage.bind(this, pin._id)}/></span>
            <div className="card-body">
              <h5 className="card-title">{pin.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{pin.subtitle}</h6>
              <p className="card-text">{pin.body}</p>
            </div>
        </div>
      </div>
    ))
    }
      // const { post, auth, showActions } = this.props;

    return (
        <div className='pinnedItem'>
          <div className='row'>
             {pinnedMessages}
          </div>
        </div>
        )
  }
}

PinnedItem.defaultProps = {
  // showActions : true
}

PinnedItem.propTypes = {
    getPinned : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   post: state.post
});
export default connect(mapStateToProps, {getPinned, deletePinned })(PinnedItem);