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
            warning: "",
            warning2: "",
            warning3: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e) {
        if (this.state.warning) {
            this.setState({ warning: ""})
        }
        if (this.state.warning2) {
            this.setState({ warning2: ""})
        }
        if (this.state.warning3) {
            this.setState({ warning3: ""})
        }
        console.log('submitting', !/[A-Z]/.test(this.state.password))
        e.preventDefault();
        if (this.state.password.length < 8) {
            this.setState({ warning: "Password must be at least 8 characters long"})
            return false;
        }
        if (!/\d/.test(this.state.password) || !/[A-Z]/.test(this.state.password) || !/[a-z]/.test(this.state.password)) {
            if (!/[a-z]/.test(this.state.password)) {
                this.setState({ warning: "Password must contain at least one lower case letter."})
            } 
            if (!/[A-Z]/.test(this.state.password)) {
                this.setState({ warning2: "Password must contain at least one Uppper Case letter"})
            } 
            if (!/\d/.test(this.state.password)) {
                this.setState({ warning: "Password must contain a number"})
            }
            return false;
        }
        if (this.state.password2 == "") {
            this.setState({ warning: "Enter confirm password"})
            return false;
        }
        if (this.state.password != this.state.password2) {
            this.setState({ warning: "Passwords must match"})
            return false;
        }
        const splitpPath = window.location.pathname.split(/[\s/]+/);
        const token = splitpPath[splitpPath.length-1];
        const newPasswords = {
            password: this.state.password,
            password2: this.state.password2,
          };
        console.log(this.props.resetPassword)
        this.props.resetPassword(newPasswords, token, this.props.history)
    }

    render() {
        const { errors } = this.state
        let warning = <div></div>
        let warning2 = <div></div>
        let warning3 = <div></div>

        if (this.state.warning) {
            warning = 
                <div className='container'>
                    <div className='row'>
                        <p className='text-danger'>{this.state.warning}</p>
                    </div>
                </div>
        } 
        if (this.state.warning2) {
            warning2 = 
                <div className='container'>
                    <div className='row'>
                        <p className='text-danger'>{this.state.warning2}</p>
                    </div>
                </div>
        } 
        if (this.state.warning2) {
            warning3 = 
                <div className='container'>
                    <div className='row'>
                        <p className='text-danger'>{this.state.warning3}</p>
                    </div>
                </div>
        } 
        return (
            <div className='reser'>
                <div className='cointainer'>
                    <div className='row'>
                    <div className="col-md-8 m-auto">
                        <h1 className='reset-4 text-center'>Reset Passwods</h1>
                        <p className="lead text-center">
                            Enter User Email
                        </p>
                        <form noValidate onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                                />
                                {warning}
                                {warning2}
                                {warning3}
                                <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                                />

                            <input type="submit" className="btn btn-royal text-white btn-block mt-4" />
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

ResetPassword.propTypes = {
    resetPassword : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {resetPassword})(ResetPassword);