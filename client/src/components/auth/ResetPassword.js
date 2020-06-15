import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { resetPassword } from '../../actions/authActions';
import '../../css/style.css';

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        console.log('changing')
    }

    onSubmit(e) {
        console.log('submitting')
    }

    render() {
        return (
            <div>Test</div>
        )
        
    }
}

ResetPassword.propTypes = {
    ResetPassword : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {resetPassword})(withRouter(ResetPassword));