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
    running: PropTypes.bool.isRequired,
    startNodeId: PropTypes.number.isRequired,
    setStartNodeId: PropTypes.func.isRequired,
    onChangeAlgorithm: PropTypes.func.isRequired,
    onClickRun: PropTypes.func.isRequired,
    onClickClear: PropTypes.func.isRequired
  };

  render() {
    let { 
      title, 
      nodes,
      algorithms, 
      selectedAlgorithm, 
      running,
      startNodeId,
      setStartNodeId,
      onChangeAlgorithm,
      onClickRun, 
      onClickClear } = this.props;

    return <div className='PlotHeader'>
      <h1>{this.props.title || 'Breadth and Depth First Search'}</h1>
      <form className='pure-form'>
          <label>Algorithm</label>
          <select value={selectedAlgorithm} onChange={onChangeAlgorithm}>
          {algorithms.map((algo) => <option value={algo} key={algo}>{algo}</option>)}
          </select>
          <label>Start Node</label>
          <select value={startNodeId} onChange={setStartNodeId}>
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