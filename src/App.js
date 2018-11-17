import React, { Component } from 'react';
import logo from './logo.svg';
import MyDiagram from './Components/MyDiagram';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false //Set render state to false
        };
    }

    componentWillMount() {
        fetch(
            'https://mongo-functions.azurewebsites.net/api/get-electric-grid?code=DC7VP4oiH6Q36l1SVtaj0oJBL6goHMNavAqnMGSdBDGO4oIu95eKyg=='
        )
            .then(response => response.json())
            .then(json => {
                console.log(json);
                console.log('la length es', json.electricgrid.length);
                this.setState({ nodos: json.electricgrid });
            })
            .then(() => {
                this.setState({ render: true }); //After 1 second, set render to true
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="App">
                <MyDiagram nodes={this.state.nodos} />
            </div>
        );
    }

    getNodes() {
        var nodes = [];
        nodes.push({
            id: 1,
            name: 'Red nacional de energia',
            tipo: 'Utility Conection',
            aristas: ['0', '3', '4']
        });

        nodes.push({
            id: 3,
            name: 'Bateria',
            tipo: 'Energy Storage',
            aristas: ['0']
        });
        nodes.push({
            id: 4,
            name: 'casa',
            tipo: 'Energy Consuming',
            aristas: []
        });
        nodes.push({
            id: 5,
            name: 'Empresa',
            tipo: 'Energy Consuming',
            aristas: ['4']
        });

        return nodes;
    }
}

export default App;
