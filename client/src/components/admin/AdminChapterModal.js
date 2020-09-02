import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/style.css';
import { updateChapters } from './../../actions/adminActions';
import SelectListGroup from '../common/SelectListGroup';

class AdminChapterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            invite_code: null,
            region:  null,
            value: null,
            chartered: null,
            level: null,
            linkedChapter: null,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeChapter = this.onChangeChapter.bind(this);
      }


      componentWillReceiveProps(nextProps) {
        if (nextProps.errors || !nextProps.education) {
            this.setState({ errors: nextProps.errors });
        }
        console.log('line 31')
        this.setState({ 
            name: nextProps.name, 
            invite_code: nextProps.invite_code, 
            region: nextProps.region, 
            linkedChapter: nextProps.linkedChapter, 
            level: nextProps.level, 
            value: nextProps.value,
            chartered: nextProps.chartered, 
        });
      }

      onSubmit(e) {
        e.preventDefault();
        console.log('modal submitted')
        let chapter = this.props.chapter;
        const chapterData = {
            orginization: this.state.orginization ? this.state.orginization : chapter.orginization,
            name: this.state.name ? this.state.name : chapter.name,
            region: this.state.region? this.state.region : chapter.region,
            value: this.state.value ? this.state.value : chapter.value,
            chartered: this.state.chartered ? this.state.chartered : chapter.chartered,
            level: this.state.level ? this.state.level : chapter.level,
            invite_code: this.state.invite_code ? this.state.invite_code : chapter.invite_code,
            linkedChapter: this.state.linkedChapter ? this.state.linkedChapter : chapter.linkedChapter && chapter.linkedChapter._id ? chapter.linkedChapter._id : "",
        }
        console.log(chapterData)
        this.props.updateChapters(this.props.chapter._id, chapterData);
      }

      onChangeChapter(e) {
        console.log('line 91', e.target.id, e.target.value)
        this.setState({ [e.target.id]: e.target.value });
      }


  render() {
    const { admin, chapter, chapters } = this.props;
    console.log('rendering', this.props)
    let chapterSelections = [<option key={1} value="" selected >Select a Linked Chapter</option>];  
    if (chapters) {
        for (let i = 0; i < chapters.length ; i++) {  
            if (chapter.linkedChapter && chapter.linkedChapter._id == chapters[i]._id ) {
                chapterSelections.push(<option key={chapters[i]._id} value={chapters[i]._id} selected >{chapters[i].name}</option>);  
            } else {
                chapterSelections.push(<option key={chapters[i]._id} value={chapters[i]._id} >{chapters[i].name}</option>); 
            }       
              
       }
    }       
    return (
      <div className='card card-body bg-light mb-3' id='adminChapterModal'>
        <div className="" id="businessModal" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Chapter</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeEditChapterModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body container">
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group row">
                            <label htmlFor="name" className="ml-10">Name</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="name" id='name' value={this.state.name ? this.state.name : chapter.name}  onChange={this.onChangeChapter} />
                            <label htmlFor="invite_code" className="ml-10 mt-8">Invite Code</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="invite_code" id='name' value={this.state.invite_code ? this.state.invite_code : chapter.invite_code}  onChange={this.onChangeChapter}/>
                            <label htmlFor="region" className="ml-10 mt-8" >Region</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="region" id='region' value={this.state.region ? this.state.region : chapter.region}  onChange={this.onChangeChapter} />
                            <label htmlFor="value" className="ml-10 mt-8" >Value</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="value" id='value' value={this.state.value ? this.state.value : chapter.value}  onChange={this.onChangeChapter} />
                            <label htmlFor="chartered" className="ml-10 mt-8" >Chartered Year</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="chartered" id='chartered' value={this.state.chartered ? this.state.chartered: chapter.chartered}  onChange={this.onChangeChapter} />
                            <label htmlFor="level" className="ml-10 mt-8">Level</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="level" id='level' value={this.state.level ? this.state.level: chapter.level}  onChange={this.onChangeChapter} />
                            <div>
                            <label htmlFor="linkedChapter" className="ml-10 mt-8">Linked Chapter</label>
                            <select name="linkedChpater" id='linkedChapter' className="form-control mr-ml-10" onChange={this.onChangeChapter}>
                                {chapterSelections}
                            </select>
                            </div>
                            {/* <input type="text" className="form-control mr-ml-10" placeholder="linkedChapter" id='linkedChapter' value={this.state.linkedChapter ? this.state.linkedChapter : chapter.linkedChapter.name}  onChange={this.onChangeChapter} /> */}
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  onClick={this.props.closeEditChapterModal} data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

AdminChapterModal.propTypes = {
//   profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  })

// export default AdminChapterModal;

export default connect(mapStateToProps, {updateChapters})(
    withRouter(AdminChapterModal )
  );