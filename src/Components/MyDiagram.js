import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import DiagramButtons from './DiagramButtons';
import './MyDiagram.css';
import { getRandomColor } from '../Helpers/ColorHelper';
import SelectionDetails from './SelectionDetails';
import '../Css/styles.css';

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
                nodeDataArray: [{ key: 'initialNode', label: 'initialNode', color: 'lightblue', img: '' }],
                linkDataArray: []
            },
            render: false
        };
    }

    componentDidMount() {
        setTimeout(
            function() {
                //Start the timer
                this.setState({ render: true }); //After 1 second, set render to true
            }.bind(this),
            1000
        );
        setTimeout(() => {
            this.mapNodesPropsToNodesStructure.bind(this);
            this.initModelHandler.bind(this);
            document.getElementById('initButton').click();
        }, 1000);
    }

    render() {
        return [
            <button id="initButton" type="button" onClick={this.initModelHandler} className="hidenButton">
                Init diagram
            </button>,
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
        var data = this.mapNodesPropsToNodesStructure();

        this.setState({
            ...this.state,
            model: {
                nodeDataArray: data.nodes,
                linkDataArray: data.lifts
            }
        });
    }

    mapNodesPropsToNodesStructure() {
        var nodos = [];
        var aristas = [];
        this.props.nodes.forEach(element => {
            nodos.push({
                key: element.device_id,
                label: this.getLabel(),
                color: 'red',
                img: this.getImgPath(element.type),
                produccion: element.data.produccion.toString(),
                consumo: element.data.consumo.toString()
            });

            element.arista.forEach(e => {
                aristas.push({ from: element.device_id, to: e.device_id, extension: 500 });
            });
        });
        var data = { nodes: nodos, lifts: aristas };
        return data;
    }

    getLabel() {}

    getImgPath(i) {
        const consumer_imgs = [
            '/assets/img/energy_consuming_1_img.png',
            '/assets/img/energy_consuming_2_img.png',
            '/assets/img/energy_consuming_3_img.png',
            '/assets/img/energy_consuming_4_img.png'
        ];

        const cons_prod_imgs = [
            '/assets/img/cons_prod_1_img.png',
            '/assets/img/cons_prod_2_img.png',
            '/assets/img/cons_prod_3_img.png',
            '/assets/img/cons_prod_4_img.png'
        ];
        switch (i) {
            case 'UtilityConnection':
                return '/assets/img/utility_connection_img.png';

            case 'StorageDevice':
                return '/assets/img/energy_storage_img.png';

            case 'ElectricityConsumingDevice':
                return consumer_imgs[Math.floor(Math.random() * consumer_imgs.length)];

            case 'PowerSource':
                return '/assets/img/power_source_img.png';

            case 'Consumer Producer':
                return cons_prod_imgs[Math.floor(Math.random() * cons_prod_imgs.length)];

            default:
                return '/assets/img/energy_consuming_1_img.png';
        }
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
            initialDocumentSpot: go.Spot.BottomCenter,
            initialViewportSpot: go.Spot.BottomCenter,
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
            autoScale: go.Diagram.Uniform,
            contentAlignment: go.Spot.Center,
            TextEdited: this.onTextEdited
        });

        /*myDiagram.add(
            $(
                go.Part, // this Part is not bound to any model data
                {
                    layerName: 'Background',
                    position: new go.Point(-425, -120),
                    selectable: false,

                    pickable: false
                },
                $(go.Picture, 'assets/img/bg1.png')
            )
        );*/

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            'Vertical',
            $(go.Picture, new go.Binding('source', 'img'), {
                desiredSize: new go.Size(100, 100)
            }),
            $(go.TextBlock, new go.Binding('text', 'produccion')),
            $(go.TextBlock, new go.Binding('text', 'consumo'))
        );
        myDiagram.linkTemplate = $(
            go.Link,
            { reshapable: true, routing: go.Link.Orthogonal },
            $(go.Shape, { stroke: 'green', strokeWidth: 2 }), // the link shape
            $(
                go.Shape, // the arrowhead
                { toArrow: 'OpenTriangle', fill: null, stroke: 'green' }
            )
        );

        // the background image, a floor plan

        return myDiagram;
    }

    imageSelection(nodeType) {
        console.log(typeof nodeType);

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
