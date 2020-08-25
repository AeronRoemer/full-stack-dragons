import React, { Component } from 'react';

class Dragon extends Component{
    state = { dragon: {
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: []
    }};
    render(){
        const { dragon } = this.state;
        return(
            <div>
                <span>G{dragon.generationId}</span>
                <span>I{dragon.dragonId}</span>
                {dragon.traits.map(trait => trait.traitValue).join(", ")}
            </div>
        )
    }
}

export default Dragon;