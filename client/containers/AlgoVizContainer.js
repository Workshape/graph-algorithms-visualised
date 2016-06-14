import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import PlotHeader from '../components/PlotHeader';
import PlotContainer from '../components/PlotContainer';
import PlotExplanation from '../components/PlotExplanation';

import { getExampleGraph, exampleGraphs } from '../utils';
import NodeModel from '../models/NodeModel';
import DepthFirstSearch from '../algorithms/DepthFirstSearch';
import BreadthFirstSearch from '../algorithms/BreadthFirstSearch';
import BipartitenessAlgorithm from '../algorithms/BipartitenessAlgorithm';
import TarjanStrongConnection from '../algorithms/TarjanStrongConnection';
import ArticulationPointSearch from '../algorithms/ArticulationPointSearch';

import './AlgoVizContainer.styl';

const ALGOS = {
  BFS: BreadthFirstSearch,
  DFS: DepthFirstSearch,
  TSC: TarjanStrongConnection,
  APS: ArticulationPointSearch,
  BA: BipartitenessAlgorithm
};

export default class AlgoVizContainer extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selectableAlgorithms: PropTypes.array.isRequired,
    graphType: PropTypes.string,
    exampleGraph: PropTypes.string,
    id: PropTypes.number.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      running: false,
      done: false,
      algorithm: this.props.selectableAlgorithms[0],
      exampleGraph: this.props.exampleGraph,
      startNodeId: 1,
      nodes: [],
      components: [],
      visitOrder: [],
      explanation: [],
      currentId: 1
    };
  }

  initialiseNodes(coords) {
    let nodes = _.assign([], getExampleGraph(this.state.exampleGraph));  

    this.setState({
      nodes: nodes,
      currentId: (nodes.length === 0) ? 1 : nodes[nodes.length - 1].id + 1
    });
  }

  runAlgorithm() {
    let selectedAlgorithm = this.state.algorithm; 
    let searchAlgorithm = new ALGOS[selectedAlgorithm](this.state.nodes, this);

    this.setState({running: true, done: false});

    let startNode = this.state.nodes.find((n) => n.id === this.state.startNodeId);

    searchAlgorithm.start(startNode)
    .then(() => this.setState({ running: false, done: true }))
    .catch((e) => {
      this.setState({ running: false });
      console.error(e);
    });
  }

  setStartNodeId(event) {
    this.setState({
      startNodeId: parseInt(event.target.value,10)
    });
  }

  addNode(x, y) {
    let node = new NodeModel(this.state.currentId, x, y);
    this.setState({
      done: false,
      nodes: _.concat(this.state.nodes, node),
      currentId: this.state.currentId + 1
    });
  }

  updateNodes(nodes) {
    this.setState({
      done: false,
      nodes: nodes
    });
  }

  clearNodes() {
    this.setState({
      nodes: [],
      visitOrder: [],
      explanation: [],
      components: [],
      currentId: 1
    });
  }

  resetNodes() {
    let update = _.assign([], this.state.nodes);
    update.forEach((x) => x.reset());

    this.setState({
      nodes: update,
      visitOrder: [],
      explanation: [],
      components: []
    });
  }

  onChangeAlgorithm(event) {
    this.setState({ algorithm: event.target.value });
  }

  onChangeGraph(event) {
    let nodes = _.assign([], getExampleGraph(event.target.value)); 

    this.setState({
      done: false,
      visitOrder: [],
      explanation: [],
      components: [],
      nodes: nodes,
      exampleGraph: event.target.value,
      currentId: (nodes.length === 0) ? 1 : nodes[nodes.length - 1].id + 1
    });
  }

  onClickRun(event) {
    event.preventDefault();
    if (!this.state.running) {
      this.resetNodes();
      this.runAlgorithm();
    }
  }

  onClickClear(event) {
    event.preventDefault();
    if (!this.state.running) {
      this.clearNodes();
    }
  }

  render() {
    let selectableAlgos = this.props.selectableAlgorithms;
    let headerProps = {
      title: this.props.title,
      algorithms: Object.keys(ALGOS).filter((algo) => (!selectableAlgos || selectableAlgos.includes(algo))),
      exampleGraphs: exampleGraphs,
      selectedExampleGraph: this.state.exampleGraph,
      nodes: this.state.nodes,
      selectedAlgorithm: this.state.algorithm,
      running: this.state.running,
      startNodeId: this.state.startNodeId,
      setStartNodeId: this.setStartNodeId.bind(this),
      onChangeGraph: this.onChangeGraph.bind(this),
      onChangeAlgorithm: this.onChangeAlgorithm.bind(this),
      onClickRun: this.onClickRun.bind(this),
      onClickClear: this.onClickClear.bind(this),
    };

    let containerProps = {
      id: this.props.id,
      graphType: this.props.graphType || 'directed',
      done: this.state.done,
      currentId: this.state.currentId,
      nodes: this.state.nodes,
      components: this.state.components,
      visitOrder: this.state.visitOrder,
      addNode: this.addNode.bind(this),
      updateNodes: this.updateNodes.bind(this),
      initialiseNodes: this.initialiseNodes.bind(this)
    };

    return <a name={this.props.name}>
      <div className='AlgoVizContainer' data-bottom-top='opacity:0;' data-top='opacity:1;'>
      <PlotHeader {...headerProps} />
      <PlotContainer {...containerProps}/>
      <PlotExplanation explanation={this.state.explanation} />
     </div>
    </a>;
  }
}