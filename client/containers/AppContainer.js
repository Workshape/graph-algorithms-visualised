import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import PlotHeader from '../components/PlotHeader';
import PlotContainer from '../components/PlotContainer';
import PlotExplanation from '../components/PlotExplanation';

import NodeModel from '../models/NodeModel';
import DepthFirstSearch from '../algorithms/DepthFirstSearch';
import BreadthFirstSearch from '../algorithms/BreadthFirstSearch';

import './AppContainer.styl';

const ALGOS = {
  BFS: BreadthFirstSearch,
  DFS: DepthFirstSearch
};

export default class AppContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      running: false,
      algorithm: 'DFS',
      nodes: [],
      visitOrder: [],
      explanation: [],
      currentId: 1
    };
  }

  runAlgorithm(type = 'BFS') {
    let selectedAlgorithm = this.state.algorithm; 
    let searchAlgorithm = new ALGOS[selectedAlgorithm](this.state.nodes, this);

    this.setState({running: true});

    searchAlgorithm.start()
    .then(() => this.setState({ running: false }))
    .catch((e) => {
      this.setState({ running: false });
      console.error(e);
    });
  }

  addNode(x, y) {
    let node = new NodeModel(this.state.currentId, x, y);
    this.setState({
      nodes: _.concat(this.state.nodes, node),
      currentId: this.state.currentId + 1
    });
  }

  updateNodes(nodes) {
    this.setState({nodes: nodes});
  }

  clearNodes() {
    this.setState({
      nodes: [],
      visitOrder: [],
      explanation: [],
      currentId: 1
    });
  }

  resetNodes() {
    let update = _.assign([], this.state.nodes);

    update.forEach((x) => {
      x.visited = false;
      x.current = false;
    });

    this.setState({
      nodes: update,
      visitOrder: [],
      explanation: []
    });
  }

  onChangeAlgorithm(event) {
    this.setState({ algorithm: event.target.value });
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
    let headerProps = {
      algorithms: Object.keys(ALGOS),
      selectedAlgorithm: this.state.algorithm,
      running: this.state.running,
      onChangeAlgorithm: this.onChangeAlgorithm.bind(this),
      onClickRun: this.onClickRun.bind(this),
      onClickClear: this.onClickClear.bind(this),
    };

    let containerProps = {
      currentId: this.state.currentId,
      nodes: this.state.nodes,
      visitOrder: this.state.visitOrder,
      addNode: this.addNode.bind(this),
      updateNodes: this.updateNodes.bind(this)
    };

    return <div className='AppContainer'>
      <PlotHeader {...headerProps} />
      <PlotContainer {...containerProps} />
      <PlotExplanation explanation={this.state.explanation} />
    </div>;
  }
}