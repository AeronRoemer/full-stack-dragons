import React, { Component } from 'react';
import { connect } from 'react-redux'
import AuthForm from './AuthForm';
import Home from './Home';

class Root extends Component {
    render(){
        return(
                this.props.account.loggedIn ? <Home /> : <AuthForm />
        )
    }
}
//maps state to props. No action creators are attached hence 'null' value
export default connect(({ account })=> ({ account }), null)(Root);