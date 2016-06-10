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
      <AlgoVizContainer 
        id={1}
        title={"Graph Traversal Algorithms"} 
        selectableAlgorithms={['DFS', 'BFS', 'TSC', 'APS', 'BA']}
        exampleGraph={'directedGraph'}/>
      <BlogContainer sectionId={2}/>
      <AlgoVizContainer 
        id={2}
        title={"Depth First Search"} 
        selectableAlgorithms={['DFS']}
        exampleGraph={'directedTree'}/>
      <BlogContainer sectionId={3}/>
      <AlgoVizContainer 
        id={3}
        title={"Breadth First Search"} 
        selectableAlgorithms={['BFS']}
        exampleGraph={'directedTree'}/>
      <BlogContainer sectionId={4}/>
      <AlgoVizContainer 
        id={4} 
        title={"Tarjan's Algorithm"} 
        selectableAlgorithms={['TSC']}
        exampleGraph={'disconnectedComponents'}/>
      <BlogContainer sectionId={5}/>
      <AlgoVizContainer 
        id={5}
        title={"Articulation Point Search"} 
        selectableAlgorithms={['APS']} 
        graphType={'undirected'}
        exampleGraph={'biconnected'}/>
      <BlogContainer sectionId={6}/>
      <AlgoVizContainer 
        id={6}
        title={"Bipartiteness Algorithm"} 
        selectableAlgorithms={['BA']} 
        graphType={'undirected'}
        exampleGraph={'biconnectedBipartite'}/>
      <BlogContainer sectionId={'references'}/>
    </div>;
  }
};