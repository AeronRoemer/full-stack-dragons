import React, { Component } from 'react';
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../assets/index';

const propertyMap = {
    backgroundColor: {
      black: '#263238',
      white: '#cfd8dc',
      green: '#a5d6a7',
      blue: '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: 100, medium: 140, large: 180, enormous: 220 }
  };

class DragonAvatar extends Component{
    get DragonImage(){
        const dragonPropertyMap = {};
        this.props.dragon.traits.forEach(trait => {
            const { traitType, traitValue } = trait;
            dragonPropertyMap[traitType] = propertyMap[traitType][traitValue]
        });
        const { backgroundColor, build, pattern, size } = dragonPropertyMap;
        const sizing = { width: size, height: size }
        return (
            <div className="dragon-avatar-image-wrapper">
                    <div className='dragon-avatar-image-background' style={{ backgroundColor, sizing }}>
                        <img src={pattern} className='dragon-avatar-image-pattern' style={ sizing }></img>
                        <img src={build} className='dragon-avatar-image' style={ sizing }></img>
                        </div>
            </div>
        );
    }
    render(){
        const dragon = this.props.dragon;
        return(
            <div>
                <span>G{dragon.generationId}</span>
                <span>I{dragon.dragonId}</span>
                {dragon.traits.map(trait => trait.traitValue).join(", ")}
                { this.DragonImage }
            </div>
        )
    }
}

export default DragonAvatar;