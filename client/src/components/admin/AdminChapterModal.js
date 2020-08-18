import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class AdminChapterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add_chapter: false,
            showEditChapterList: false,
            showUpdateChapter: false,
            add_officer: false,
            edit_officer: false,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
      }

      onSubmit(e) {
        e.preventDefault();
        console.log('modal submitted')
        // const accountData = {
        //     first_name: this.state.first_name,
        //     last_name: this.state.last_name,
        //     name: this.state.first_name + " " + this.state.last_name,
        //     id: this.state.id,
        // }
    
        // this.props.updateCurrentUser(accountData);
      }

  render() {
    const { admin } = this.props;

    return (
      <div className='card card-body bg-light mb-3' id='adminChapterModal'>
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Chapter</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="name" value={admin.chapter.name}  onChange={this.onChangeChapter} />
                            <input type="text" class="form-control" placeholder="invite_code" value={admin.chapter.invite_code}  onChange={this.onChangeChapter}/>
                            <input type="text" class="form-control" placeholder="region" value={admin.chapter.region}  onChange={this.onChangeChapter} />
                            <input type="text" class="form-control" placeholder="value" value={admin.chapter.value}  onChange={this.onChangeChapter} />
                            <input type="text" class="form-control" placeholder="chartered" value={admin.chapter.chartered}  onChange={this.onChangeChapter} />
                            <input type="text" class="form-control" placeholder="linkedchapter" value={admin.chapter.linkedChapter.name}  onChange={this.onChangeChapter} />
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete Business</button>
                        <button type="button" className="btn btn-secondary"  onClick={this.onCancel} data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

AdminChapterModal.propTypes = {
  profile: PropTypes.object.isRequired
}

export default AdminChapterModal;