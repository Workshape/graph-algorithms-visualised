import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import BlogContainer from './BlogContainer';
import AlgoVizContainer from './AlgoVizContainer';

import './AppContainer.styl';

export default class AppContainer extends Component {
  render() {
    return <div className='AppContainer'>
      <BlogContainer sectionId={1}/>
      <AlgoVizContainer title={"Depth and Breadth First Search"} selectableAlgorithms={['DFS', 'BFS']} id={1}/>
      <BlogContainer sectionId={2}/>
      <AlgoVizContainer title={"Tarjan's Algorithm"} selectableAlgorithms={['TSC']} id={2}/>
      <BlogContainer sectionId={3}/>
      <AlgoVizContainer title={"Articulation Point Search"} selectableAlgorithms={['APS']} graphType={'undirected'} id={3}/>
    </div>;
  }
};