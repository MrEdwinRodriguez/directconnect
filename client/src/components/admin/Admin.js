import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactShadowScroll from 'react-shadow-scroll';
import AdminChapterModal from './AdminChapterModal';
import AdminAddChapter from './AdminAddChapter';
import PropTypes from 'prop-types';
import { deleteAccount } from './../../actions/profileActions';
import { updateCurrentUser, getCurrentUser } from './../../actions/authActions';
import { adminGetChapters, adminGetChapter, getOrginizations} from './../../actions/adminActions';
import '../../css/style.css';



class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
          add_chapter: false,
          showAddChapter: false,
          showEditChapterList: false,
          showUpdateChapter: false,
          add_officer: false,
          edit_officer: false,
          errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onChangeChapter = this.onChangeChapter.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onAddChapter = this.onAddChapter.bind(this);
      this.onEditChapter = this.onEditChapter.bind(this);
      this.closeEditChapterModal = this.closeEditChapterModal.bind(this);
    }
  
    componentDidMount() {
      this.props.getCurrentUser();
      this.props.getOrginizations();
      this.props.adminGetChapters();
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors || !nextProps.education) {
          this.setState({ errors: nextProps.errors });
      }

    }
  
    onSubmit(e) {
      e.preventDefault();
      const accountData = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          name: this.state.first_name + " " + this.state.last_name,
          id: this.state.id,
      }
  
      this.props.updateCurrentUser(accountData);
    }
  
    onChange(e) {
      if (this.props.auth.success) {
        this.props.auth.success = false;
      }
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onAddChapter(e) {
        this.setState({
          showAddChapter: !this.state.showAddChapter,
        });
      }

      onEditChapter(e) {
        console.log('edit chapters')
        this.props.adminGetChapters()
        this.setState({
          showEditChapterList: !this.state.showEditChapterList,
        });
        
      }

      getChapter(e) {
        console.log(this)
        console.log(e)
        this.props.adminGetChapter(e)
        this.setState({
            showEditChapterList: false,
            showUpdateChapter: true,
          });
      }

      onChangeChapter(e) {
        console.log('line 91')
        console.log(e)
      }

      closeEditChapterModal () {
          console.log('close edit modal')
        this.setState({
            showEditChapterList: true,
            showUpdateChapter: false,
        });
    }

      updateChapters(e) {
        
      }

    render() {
      const { errors } = this.state;
      const { admin, auth } = this.props;

      if (this.state.updated) {
        setTimeout(this.updated, 5000)
      }

      let showChapters = "";
      if (admin && admin.chapters && this.state.showEditChapterList) {
        const chapterNames = admin.chapters.map((chapter) =>
        <li className='list-group-item borderlist' key={chapter._id} id={chapter._id} onClick={this.getChapter.bind(this, chapter._id)}>{chapter.name}</li>
        )
        showChapters=  
            <ReactShadowScroll>  
                <ul className='list-group list-group-flush'>{chapterNames}</ul>
            </ReactShadowScroll>

      }

      let upDateChapter = null;
      if (admin.chapter && admin.chapter.name && this.state.showUpdateChapter) {
        upDateChapter = 
        <AdminChapterModal 
        closeEditChapterModal={this.closeEditChapterModal} 
        chapter = {admin.chapter}
        chapters = {admin.chapters}
        admin={admin} />
      }

      let displayAdmin = <h1>You do no have Admin Permission </h1>
      console.log(auth.user.is_admin)
    if (auth.user.is_admin) {
        displayAdmin = <div>
        <h1 className="display-4 text-center">Admin</h1>
        <ul className="list-group">
            <li className="list-group-item" onClick={this.onAddChapter}>Add Chapter</li>
                { this.state.showAddChapter ? 
                    <AdminAddChapter
                    // closeEditChapterModal={this.closeEditChapterModal} 
                    getOrginizations = {admin.orginizations}
                    chapters = {admin.chapters}
                    admin={admin} />
                  : <div></div>}
            <li className="list-group-item" onClick={this.onEditChapter}>Edit Chapters</li>
                { this.state.showEditChapterList ? <div className= "adminScrollBox">{showChapters}</div> : <div></div>}
                { this.state.showUpdateChapter ? <div>{upDateChapter}</div> : <div></div>}
            <li className="list-group-item">Edit Chapter Officers</li>
                { this.state.add_officers ? <div className= "alert alert-success">BUILD ADD OFFICERS HERE</div> : <div></div>}
            <li className="list-group-item">Send Email</li>
                { this.state.edit_officers ? <div className= "alert alert-success">BUILD EDIT OFFICERS HERE</div> : <div></div>}
        </ul>  
        </div>
    }
      return (
        <div className="add-business">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                {displayAdmin}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  Admin.propTypes = {
    adminGetChapters: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    updateCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    admin: state.admin,
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { adminGetChapters, adminGetChapter, updateCurrentUser, getCurrentUser, getOrginizations})(
    withRouter(Admin )
  );