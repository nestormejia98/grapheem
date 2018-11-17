import React, { Component } from 'react';
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
                this.setState({ render: true }); //After 1 second, set render to true
            })
            .catch(e => console.log(e));
    }

    render() {
        if (this.state.render) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src="/assets/img/logo.gif" className="App-logo" alt="logo" /> <br />
                        <br />
                        <h1 className="App-title">Serverless Power Management System</h1>
                    </header>
                    <div id="title">
                        <h3>Real Time Panel Control</h3>
                    </div>
                    <MyDiagram nodes={this.state.nodos} />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src="/assets/img/logo.gif" className="App-logo" alt="logo" /> <br />
                        <br />
                        <h1 className="App-title">Serverless Power Management System</h1>
                    </header>
                    <MyDiagram nodes={this.getNodes()} />
                </div>
            );
        }
    }

    getNodes() {
        var nodes = [];
        nodes.push({
            id: 1,
            name: 'Red nacional de energia',
            tipo: 'Utility Conection',
            aristas: ['0', '3', '4'],
            produccion: '100'
        });

        nodes.push({
            id: 2,
            name: 'Red nacional de energia',
            tipo: 'Utility Conection',
            aristas: ['0', '3', '4']
        });
        nodes.push({
            id: 3,
            name: 'Bateria',
            tipo: 'Energy Storage',
            aristas: ['0'],
            produccion: '100'
        });
        nodes.push({
            id: 4,
            name: 'casa',
            tipo: 'Energy Consuming',
            aristas: [],
            produccion: '100'
        });
        nodes.push({
            id: 5,
            name: 'Empresa',
            tipo: 'Energy Consuming',
            aristas: ['4'],
            produccion: '100'
        });

        nodes.push({
            id: 6,
            name: 'Red nacional de energia',
            tipo: 'Utility Conection',
            aristas: ['0', '3', '4'],
            produccion: '100'
        });

        nodes.push({
            id: 7,
            name: 'Red nacional de energia',
            tipo: 'Utility Conection',
            aristas: ['0', '3', '4'],
            produccion: '100'
        });
        nodes.push({
            id: 8,
            name: 'Bateria',
            tipo: 'Energy Storage',
            aristas: ['0'],
            produccion: '100'
        });
        nodes.push({
            id: 9,
            name: 'casa',
            tipo: 'Energy Consuming',
            aristas: [],
            produccion: '100'
        });
        nodes.push({
            id: 10,
            name: 'Empresa',
            tipo: 'Energy Consuming',
            aristas: ['4'],
            produccion: '100'
        });

        return nodes;
    }
}

export default App;
