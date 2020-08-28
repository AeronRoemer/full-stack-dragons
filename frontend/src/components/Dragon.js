import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDragon } from '../actions/dragon';
import DragonAvatar from './DragonAvatar';

class Dragon extends Component{
    render(){
        return(
            <div>
                {//without callback the fethcDragon() would be called at the same time as render, creating a loop 
                }
                <button onClick={() => this.props.fetchDragon()}>New Dragon</button>
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}
//see Generation component for full version
export default connect(
    ({dragon}) => ({ dragon }), //puts 'dragon' in props
    { fetchDragon }
)(Dragon);