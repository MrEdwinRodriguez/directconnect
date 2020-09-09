import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getUserAssociatedChapters, sendEmail } from '../../actions/orginizationActions';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../css/style.css';


class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendTo: '',
            email_subject: "",
            email_content: "",
            html_content: "",
            editorState: EditorState.createEmpty(),
            errors: {},
          };
          this.onSumitEmail = this.onSumitEmail.bind(this);
          this.onChange = this.onChange.bind(this);
          this.onEditorStateChange = this.onEditorStateChange.bind(this);
      }

    componentDidMount () {
        this.props.getUserAssociatedChapters();
    }
    componentWillUpdate() {
    }

    onEditorStateChange (editorState) {
        this.setState({
          editorState,
        });
      };

    onSumitEmail(e) {
        e.preventDefault();
        const emailData = {
            subject: this.state.email_subject,
            content: this.state.html_content,
            sendTo: this.state.sendTo,
        }
        console.log(emailData)
        this.props.sendEmail(emailData, this.props.history);
    }

    onChange(e) {
        if(e && e.target && e.target.name && e.target.value)
            this.setState({[e.target.name]: e.target.value})
        else if (this.state.editorState ) {
            this.setState({html_content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))})
        }
    }


  render() {
    const { errors } = this.state;
    const { editorState } = this.state;
    const { user } = this.props.auth;
    let chapterInfo = this.props.orginization.chapter && this.props.orginization.chapter[0] ? this.props.orginization.chapter[0] : "";
    let chapterName = chapterInfo.name;
    let chapters = [];
    if (chapterInfo) {
        chapters = [
            {label: "Send To: ", value: 0},
            {label: chapterName, value: 'chapter'},
            {label: chapterName + " and " + chapterInfo.linkedChapter.name , value: 'linked'},
            {label: chapterInfo.orginization.name + " ("+ chapterInfo.region + ") "  , value: 'region'},
            {label: chapterInfo.orginization.name + " and " + chapterInfo.linkedChapter.orginization.name + " ("+ chapterInfo.region + ") " , value: 'region_orginization'},
            // {label: "Full Network", value: 'full_network'}, //uncomment after more chapters are added
        ];
    }
    let displaySendEmail = 
        <div className="col-md-12">
            <form onSubmit={this.onSumitEmail}>
                <SelectListGroup 
                    placeholder="Send To"
                    name='sendTo'
                    value={this.state.sendTo}
                    onChange={this.onChange}
                    options={chapters}
                    error={errors.sendTo}
                    info="Who is the email being sent to?"/>
                <TextFieldGroup 
                    placeholder="Subject"
                    name="email_subject"
                    value={this.state.email_subject}
                    onChange={this.onChange}
                    error={errors.email_subject}
                    info="Email Subject Line."/>              
                <Editor
                    placeholder="Email Body"
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    onChange={this.onChange}
                    name="email_content"
                    error={errors.email_content}
                    wrapperClassName="form-group"
                    editorClassName="form-control form-control-lg textAreaSize"
                    info="Email Body." 
                    />
                <input
                  type="submit"
                  value="Send Email"
                  className="btn btn-royal btn-block text-white mt-4"
                />
              </form>
        </div>
    
    return (
        <div className="sendEmail">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center" id='network'>Send Email</h1> 
                        {displaySendEmail}
                    </div>
                </div>
            </div>
        </div>
    )

    
  }
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    orginization: state.orginization
})

export default connect(mapStateToProps, { getUserAssociatedChapters, sendEmail })(SendEmail);