import React, { Component } from 'react'
import { axios } from "../utils/Axios";
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { authenticated, unauthenticated } from '../actions/actionCreators'
import { withRouter } from "react-router-dom";

class LoginContainer extends Component {
    handleSubmit = (params) => {
        let data = {
            user: {
                email: params.email,
                password: params.password
            }
        }
		axios.post('/users/sign_in', data)
		.then(response => {
            this.props.dispatch(authenticated());
            localStorage.setItem('jwt', response.headers['authorization']);
            this.props.history.push('/');
		})
		.catch(error => {
            // console.log(error);
            this.props.dispatch(unauthenticated('Login failed'));
        })
    }

    render() {
        return (
            <LoginForm handleSubmit={this.handleSubmit} />
        );
    }
}

export default connect()(withRouter(LoginContainer));
