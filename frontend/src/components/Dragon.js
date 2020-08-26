import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';

class Dragon extends Component{
    state = { dragon: {
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: []
    }};
    componentDidMount(){
        this.fetchDragon();
    }
    fetchDragon = () => {
        fetch('http://localhost:3000/dragon/new')
            .then(response => response.json())
            .then(json => this.setState({dragon: json.dragon}))
            .catch(error => console.error('error', error))
    }
    render(){
        return(
            <div>
                {//without callback the fethcDragon() would be called at the same time as render, creating a loop 
                }
                <button onClick={() => this.fetchDragon()}>New Dragon</button>
                <DragonAvatar dragon={this.state.dragon} />
            </div>
        )
    }
}

export default Dragon;