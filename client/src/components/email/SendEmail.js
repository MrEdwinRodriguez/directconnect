import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getUserAssociatedChapters } from '../../actions/orginizationActions';


class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            update: false,
            errors: {},
          };
      }

    componentDidMount () {
        this.props.getUserAssociatedChapters();
    }
    componentWillUpdate() {
        console.log(this)
    }


  render() {
    const { errors} = this.state;
    const { user } = this.props.auth;
    let chapterInfo = this.props.orginization.chapter && this.props.orginization.chapter[0] ? this.props.orginization.chapter[0] : "";
    console.log(chapterInfo)
    let chapterName = chapterInfo.name;
    let chapters = [];
    if (chapterInfo) {
        chapters = [
            {label: "Send To: ", value: 0},
            {label: chapterName, value: 'chapter'},
            {label: chapterName + " and " + chapterInfo.linkedChapter.name , value: 'linked'},
            {label: chapterInfo.orginization.name + " ("+ chapterInfo.region + ") "  , value: 'region'},
            {label: chapterInfo.orginization.name + " and " + chapterInfo.linkedChapter.orginization.name + " ("+ chapterInfo.region + ") " , value: 'region_orginization'},
            {label: "Full Network", value: 'full_network'},
        ];
    }
    let displaySendEmail = <h1>You do no have Email Permisions </h1>
    if (user.is_admin || user.is_org_officer) {
        displaySendEmail = 
        <div className="col-md-12">
            <form onSubmit={this.onSubmit}>
            <SelectListGroup 
                        placeholder="Chapter"
                        name='chapter'
                        value={this.state.chapter}
                        onChange={this.onChange}
                        options={chapters}
                        error={errors.chapter}
                        info="What chapter did you pledge?"/>
                <TextFieldGroup 
                    placeholder="Subject"
                    name="email_subject"
                    value={this.state.email_subject}
                    onChange={this.onChange}
                    error={errors.email_subject}
                    info="Email Subject Line."/>              
                <TextAreaFieldGroup
                    placeholder="Email"
                    name='email_content'
                    value={this.email_content}
                    onChange={this.onChange}
                    error={errors.email_content}
                    info="Content of the Email."/>
                <input
                  type="submit"
                  value="Edit Position"
                  className="btn btn-royal btn-block text-white mt-4"
                />
              </form>
        </div>
    } 
    return (
        <div className="sendEmail">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center" id='network'>Admin - Send Email</h1> 
                        {displaySendEmail}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}

SendEmail.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    orginization: state.orginization
})

export default connect(mapStateToProps, { getUserAssociatedChapters})(SendEmail);