import React, { Component } from 'react';

class Generation extends Component{
    state = {
        generation : {
            expiration: "",
            generationId: ''
        }
    }
    timer = null;
    componentDidMount(){
        this.fetchNextGeneration();
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    fetchGeneration = () => {
        fetch('http://localhost:3000/generation/')
            .then(response => response.json())
            .then(json => this.setState({generation: json.generation}))
            .catch(error => console.error('error', error))
    }
    fetchNextGeneration = () => {
        this.fetchGeneration();
        let delay = new Date(this.state.generation.expiration).getTime() - new Date().getTime();

        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);

    }
    render(){
        const {generation} = this.state
        return(
            <div>
                <h3>Generation {generation.generationId}. Expires on: </h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        )
    }
}
export default Generation;