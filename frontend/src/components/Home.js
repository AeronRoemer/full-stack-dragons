import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Generation  from './Generation';
import Dragon from './Dragon';
import { logout } from '../actions/account';

class Home extends Component {
render(){
    return(
    <div>
        <Button onClick={this.props.logout}>Logout</Button>
        <h2>Generation from React</h2>
        <Generation />
        <Dragon />
        <hr />
        <Link to="/account-dragons"> Account Dragons </Link>
        
    </div>
    );
}
}

export default connect(null, { logout })(Home);