import React, { Component } from 'react';
import logo from './logo.svg';
import MyDiagram from './Components/MyDiagram';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">react-gojs example in es6</h1>
                </header>
                <MyDiagram nodes={this.getNodes()} />
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
