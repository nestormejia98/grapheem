import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import DiagramButtons from './DiagramButtons';
import './MyDiagram.css';
import { getRandomColor } from '../Helpers/ColorHelper';
import SelectionDetails from './SelectionDetails';

class MyDiagram extends React.Component {
    nodeId = 0;

    constructor(props) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
        this.modelChangeHandler = this.modelChangeHandler.bind(this);
        this.initModelHandler = this.initModelHandler.bind(this);
        this.updateColorHandler = this.updateColorHandler.bind(this);
        this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.addNode = this.addNode.bind(this);
        this.updateNodeText = this.updateNodeText.bind(this);
        this.onTextEdited = this.onTextEdited.bind(this);
        this.state = {
            selectedNodeKeys: [],
            model: {
                nodeDataArray: [{ key: 'initialNode', label: 'initialNode', color: 'lightblue' }],
                linkDataArray: []
            }
        };
    }

    render() {
        return [
            <DiagramButtons
                key="diagramButtons"
                onInit={this.initModelHandler}
                onUpdateColor={this.updateColorHandler}
                onAddNode={this.addNode}
            />,
            <SelectionDetails key="selectionDetails" selectedNodes={this.state.selectedNodeKeys} />,
            <GojsDiagram
                key="gojsDiagram"
                diagramId="myDiagramDiv"
                model={this.state.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
                onModelChange={this.modelChangeHandler}
            />
        ];
    }

    initModelHandler() {
        this.setState({
            ...this.state,
            model: {
                nodeDataArray: [
                    {
                        key: 'HidCent1',
                        label: 'Central Hidráulica 1',
                        color: 'lightblue',
                        img: '/assets/img/utility_connection_img.png'
                    },
                    {
                        key: 'Cons1',
                        label: 'Consumidor 1',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'Cons2',
                        label: 'Consumidor 2',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'AltEner1',
                        label: 'Energía Alternativa 1',
                        color: 'green',
                        img: '/assets/img/power_source_img.png'
                    },
                    {
                        key: 'HidCent2',
                        label: 'Central Hidráulica 2',
                        color: 'lightblue',
                        img: '/assets/img/utility_connection_img.png'
                    },
                    {
                        key: 'Cons3',
                        label: 'Consumidor 3',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'Cons4',
                        label: 'Consumidor 4',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'HidCent3',
                        label: 'Central Hidráulica 3',
                        color: 'lightblue',
                        img: '/assets/img/utility_connection_img.png'
                    },
                    {
                        key: 'Cons5',
                        label: 'Consumidor 5',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'Cons6',
                        label: 'Consumidor 6',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    {
                        key: 'AltEner2',
                        label: 'Energía Alternativa 2',
                        color: 'green',
                        img: '/assets/img/power_source_img.png'
                    },
                    {
                        key: 'Cons7',
                        label: 'Consumidor 7',
                        color: 'red',
                        img: '/assets/img/energy_consuming_1_img.png'
                    },
                    { key: 'Cons8', label: 'Consumidor 8', color: 'red', img: '/assets/img/energy_consuming_1_img.png' }
                ],
                linkDataArray: [
                    { from: 'HidCent1', to: 'Cons1', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'HidCent2', to: 'Cons3', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'HidCent3', to: 'Cons5', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'Cons1', to: 'Cons2', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'Cons3', to: 'Cons4', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'Cons5', to: 'Cons6', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'Cons7', to: 'Cons8', fromSpot: 'Right', toSpot: 'Left' },
                    { from: 'Cons1', to: 'Cons3', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'Cons2', to: 'Cons4', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'Cons3', to: 'Cons5', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'Cons4', to: 'Cons6', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'Cons5', to: 'Cons7', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'Cons6', to: 'Cons8', fromSpot: 'Bottom', toSpot: 'Top' },
                    { from: 'AltEner1', to: 'Cons2', fromSpot: 'Left', toSpot: 'Right' },
                    { from: 'AltEner2', to: 'Cons6', fromSpot: 'Left', toSpot: 'Right' }
                ]
            }
        });
    }

    updateColorHandler() {
        const updatedNodes = this.state.model.nodeDataArray.map(node => {
            return {
                ...node,
                color: getRandomColor()
            };
        });

        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: updatedNodes
            }
        });
    }

    createDiagram(diagramId: string) {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
            // layout: $(go.TreeLayout, {
            //     angle: 0,
            //     arrangement: go.TreeLayout.ArrangementVertical,
            //     treeStyle: go.TreeLayout.StyleLayered
            // }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
            TextEdited: this.onTextEdited
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            'Vertical',
            $(go.Picture, new go.Binding('source', 'img'), {
                desiredSize: new go.Size(55, 55)
            })
        );

        return myDiagram;
    }

    imageSelection(nodeType) {
        console.log(typeof nodeType);
        const $ = go.GraphObject.make;
        if (nodeType.includes('HidCent')) {
            return '/assets/img/utility_connection_img.png';
        } else if (nodeType.includes('Cons')) {
            return '/assets/img/energy_consuming_1_img.png';
        } else if (nodeType.includes('AltEner')) {
            return '/assets/img/power_source_img.png';
        } else {
            return '/assets/img/energy_consuming_2_img.png';
        }
    }

    modelChangeHandler(event) {
        switch (event.eventType) {
            case ModelChangeEventType.Remove:
                if (event.nodeData) {
                    this.removeNode(event.nodeData.key);
                }
                if (event.linkData) {
                    this.removeLink(event.linkData);
                }
                break;
            default:
                break;
        }
    }

    addNode() {
        const newNodeId = 'node' + this.nodeId;
        const linksToAdd = this.state.selectedNodeKeys.map(parent => {
            return { from: parent, to: newNodeId };
        });
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray,
                    { key: newNodeId, label: newNodeId, color: getRandomColor() }
                ],
                linkDataArray:
                    linksToAdd.length > 0
                        ? [...this.state.model.linkDataArray].concat(linksToAdd)
                        : [...this.state.model.linkDataArray]
            }
        });
        this.nodeId += 1;
    }

    removeNode(nodeKey) {
        const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
                ]
            }
        });
    }

    removeLink(linKToRemove) {
        const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...this.state.model,
                linkDataArray: [
                    ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
                ]
            }
        };
    }

    updateNodeText(nodeKey, text) {
        const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToUpdateIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
                    {
                        ...this.state.model.nodeDataArray[nodeToUpdateIndex],
                        label: text
                    },
                    ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1)
                ]
            }
        });
    }

    nodeSelectionHandler(nodeKey, isSelected) {
        if (isSelected) {
            this.setState({
                ...this.state,
                selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
            });
        } else {
            const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState({
                ...this.state,
                selectedNodeKeys: [
                    ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
                ]
            });
        }
    }

    onTextEdited(e) {
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const node = tb.part;
        if (node instanceof go.Node) {
            this.updateNodeText(node.key, tb.text);
        }
    }
}

export default MyDiagram;
