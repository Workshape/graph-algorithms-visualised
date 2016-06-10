import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import './PlotHeader.styl';

export default class PlotHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.array.isRequired,
    algorithms: PropTypes.array.isRequired,
    selectedAlgorithm: PropTypes.string,
    exampleGraphs: PropTypes.object.isRequired,
    selectedExampleGraph: PropTypes.string,
    running: PropTypes.bool.isRequired,
    startNodeId: PropTypes.number.isRequired,
    setStartNodeId: PropTypes.func.isRequired,
    onChangeAlgorithm: PropTypes.func.isRequired,
    onChangeGraph: PropTypes.func.isRequired,
    onClickRun: PropTypes.func.isRequired,
    onClickClear: PropTypes.func.isRequired
  };

  render() {
    let { 
      title, 
      nodes,
      algorithms, 
      selectedAlgorithm,
      exampleGraphs,
      selectedExampleGraph, 
      running,
      startNodeId,
      setStartNodeId,
      onChangeGraph,
      onChangeAlgorithm,
      onClickRun, 
      onClickClear } = this.props;

    return <div className='PlotHeader'>
      <h1>{this.props.title || 'Breadth and Depth First Search'}</h1>
      <form className='pure-form'>
          <label className='algorithm'>Algorithm</label>
          <select className='algorithm' value={selectedAlgorithm} onChange={onChangeAlgorithm}>
          {algorithms.map((algo) => <option value={algo} key={algo}>{algo}</option>)}
          </select>
          <label className='example-graph'>Example Graph</label>
          <select className='example-graph' value={selectedExampleGraph} onChange={onChangeGraph}>
          {Object.keys(exampleGraphs).map((key) => <option value={key} key={key}>{key}</option>)}
          </select>
          <label className='start-node'>Start Node</label>
          <select className='start-node' value={startNodeId} onChange={setStartNodeId}>
          {nodes.map((node) => <option value={node.id} key={node.id}>{node.id}</option>)}
          </select>
          <button className={cx('pure-button', { disabled: running, 'button-primary': !running })} onClick={onClickRun}>
            {(running ? `Running ${selectedAlgorithm}` : 'Run')}
          </button>
          <button className={cx('pure-button', { disabled: running, 'button-secondary': !running })} onClick={onClickClear}>
            Clear
          </button>
      </form>
    </div>;
  }
};