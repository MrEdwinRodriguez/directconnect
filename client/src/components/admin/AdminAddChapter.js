import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/style.css';
import { addChapter } from './../../actions/adminActions';
import SelectListGroup from '../common/SelectListGroup';

class AdminAddChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orginization: null, 
            name: "",
            invite_code: "",
            region:  "",
            value: "",
            chartered: "",
            level: 'undergrad',
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
      }

      onSubmit(e) {
        e.preventDefault();
        console.log('modal submitted')
        if(!this.state.orginization) {
            this.setState({ errors: {orginization:  "Orginization is required"} })
            return false;
        }
        if(!this.state.name) {
            this.setState({ errors: {name:  "Name is required"} })
            return false;
        }
        if(!this.state.invite_code) {
            this.setState({ errors: {invite_code:  "Invite Code is required"} })
            return false;
        }
        if(!this.state.region) {
            this.setState({ errors: {region:  "Region is required"} })
            return false;
        }
        if(!this.state.value) {
            this.setState({ errors: {value:  "Value is required"} })
            return false;
        }
        if(!this.state.chartered) {
            this.setState({ errors: {chartered:  "Year Chartered is required"} })
            return false;
        }
        if(!this.state.level) {
            this.setState({ errors: {level:  "Level is required"} })
            return false;
        }
        const chapterData = {
            orginization: this.state.orginization,
            name: this.state.name,
            region: this.state.region,
            value: this.state.value,
            chartered: this.state.chartered,
            level: this.state.level,
            invite_code: this.state.invite_code,
            linkedChapter: this.state.linkedChapter,
        }
        console.log(chapterData)
        this.props.addChapter(chapterData);
      }

      onChangeChapter(e) {
        console.log('line 91', e.target.id, e.target.value)
        if(e.target.id == "linkedChapter") {
            if (e.target.value != "") 
                this.setState({ linkedChapter: e.target.value });
        } else {
            this.setState({ [e.target.id]: e.target.value });
        }
        
      }


  render() {
    const { admin} = this.props;  
    const { errors} = this.state;  

    return (
      <div className='card card-body bg-light mb-3' id='adminAddChapter'>
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
                        <div className="form-group row">
                            {/* <div> */}
                            <label htmlFor="orginizations" className="ml-10 mt-8">Orginization</label>
                            <select name="orginization" id='orginization' className="form-control mr-ml-10" onChange={this.onChangeChapter}>
                            <option key={1} value="" >Select Orginization</option>
                                {admin.orginizations.map((orginization) => (
                                    <option key={orginization._id} value={orginization._id} >{orginization.name}</option>     
                                ))}
                            </select>
                            {/* </div> */}
                            {errors && errors.orginization ? <div className="adminError col-12">{errors.orginization}</div> : "" }
                            <label htmlFor="name" className="ml-10">Name</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="name" id='name' value={this.state.name}  onChange={this.onChangeChapter} />
                            {errors && errors.name ? <div className="adminError col-12">{errors.name}</div> : "" }
                            <label htmlFor="invite_code" className="ml-10 mt-8">Invite Code</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="invite_code" id='invite_code' value={this.state.invite_code}  onChange={this.onChangeChapter}/>
                            {errors && errors.invite_code ? <div className="adminError col-12">{errors.invite_code}</div> : "" }
                            <label htmlFor="region" className="ml-10 mt-8" >Region</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="region" id='region' value={this.state.region}  onChange={this.onChangeChapter} />
                            {errors && errors.region ? <div className="adminError col-12">{errors.region}</div> : "" }
                            <label htmlFor="value" className="ml-10 mt-8" >Value</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="value" id='value' value={this.state.value}  onChange={this.onChangeChapter} />
                            {errors && errors.value ? <div className="adminError col-12">{errors.value}</div> : "" }
                            <label htmlFor="chartered" className="ml-10 mt-8" >Chartered Year</label>
                            <input type="text" className="form-control mr-ml-10" placeholder="chartered" id='chartered' value={this.state.chartered}  onChange={this.onChangeChapter} />
                            {errors && errors.chartered ? <div className="adminError col-12">{errors.chartered}</div> : "" }
                            <label htmlFor="level" className="ml-10 mt-8">Level</label>
                            <select name="level" id='level' className="form-control mr-ml-10" onChange={this.onChangeChapter}>
                                <option key='undergrad' value='undergrad' >Undergrad</option>
                                <option key='grad' value='grad' >Grad</option>
                            </select>
                            {errors && errors.level ? <div className="adminError col-12">{errors.level}</div> : "" }
                            <label htmlFor="linkedChapter" className="ml-10 mt-8">Linked Chapter</label>
                            <select name="linkedChpater" id='linkedChapter' className="form-control mr-ml-10" onChange={this.onChangeChapter}>
                                <option key={1} value="" >Select Linked Chapter</option>
                                {admin.chapters.map((chapter) => (
                                    <option key={chapter._id} value={chapter._id} >{chapter.name}</option>     
                                ))}
                            </select>
              
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

AdminAddChapter.propTypes = {
//   profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  })

// export default AdminChapterModal;

export default connect(mapStateToProps, { addChapter})(
    withRouter(AdminAddChapter )
  );