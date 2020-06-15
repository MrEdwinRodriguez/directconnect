import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword   } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import '../../css/style.css';


class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            sent: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit (e) {
        e.preventDefault();
        this.props.forgotPassword ({email: this.state.email})
        this.setState({ sent: true})

    }

    render() {
        const { errors } = this.state

        if (this.state.sent) {
            var resetPageDisplay =  
                <div className="col-md-8 m-auto">
                    <p className="lead text-center">An email has been sent to {this.state.email} to reset your password</p>
                </div>
        } else {
            var resetPageDisplay =  
            <div className="col-md-8 m-auto">
                <h1 className='reset-4 text-center'>Reset Passwods</h1>
                <p className="lead text-center">
                    Enter User Email
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder='Email Address'
                        name='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                    />
                    <input type="submit" className="btn btn-royal text-white btn-block mt-4" />
                </form>
            </div>

        }

        return (
            <div className="forgotPassword ">
                <div className='container'>
                    <div className='row'>
                        {resetPageDisplay}
                    </div>
                </div>
            </div>

        )
    }
}

ForgotPassword.propTypes = {
    ForgotPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {forgotPassword })(withRouter(ForgotPassword));

