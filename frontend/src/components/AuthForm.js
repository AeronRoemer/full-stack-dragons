import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component{
    state = { username: '', password: '', buttonClicked: false}
    updateUsername = event => {
        this.setState({username: event.target.value});
    }
    updatePassword = event => {
        this.setState({password: event.target.value});
    }
    login = () =>{
        const { username, password } = this.state;
        this.setState({buttonClicked: true});
        this.props.login({ username, password });
        
    }
    signup = () =>{
        const { username, password } = this.state;
        this.setState({buttonClicked: true});
        this.props.signup({ username, password })
    }
    get Error() {
        if (
          this.state.buttonClicked &&
          this.props.account.status === fetchStates.error
        ) {
          return <div>There was an error: {this.props.account.message}</div>
        }
      }
    render(){
        return(
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FormControl 
                        type="text"
                        value={this.state.username}
                        placeholder="username"
                        onChange={this.updateUsername} />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        type="password"
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.updatePassword} />
                </FormGroup>
                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span>  or  </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
                {this.Error}
            </div>
        )
    }
}
// first parameter is for mapStateToProps- but the state here is local
export default connect(({ account }) =>({ account }), { signup, login })(AuthForm);