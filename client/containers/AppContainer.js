import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import BlogContainer from './BlogContainer';
import AlgoVizContainer from './AlgoVizContainer';
import ContentsContainer from './ContentsContainer';
import BlogHeading from '../components/BlogHeading';

import './AppContainer.styl';

const sections = [
  { title: 'Top', link: '#top'},
  { title: 'Introduction', link: '#introduction'},
  { title: 'Main Visualisation', link: '#main-visualisation'},
  { 
    title: 'Depth First Search', 
    link: '#dfs',
    subSections: [
      { title: 'Visualisation', link: '#dfs-visualisation' },
      { title: 'Pseudocode', link: '#dfs-pseudocode' },
    ]
  },
  { 
    title: 'Breadth First Search', 
    link: '#bfs',
    subSections: [
      { title: 'Visualisation', link: '#bfs-visualisation' },
      { title: 'Pseudocode', link: '#bfs-pseudocode' },
    ]
  },
  { 
    title: 'Observations Depth First Search and Breadth First Search', 
    link: '#observations'
  },
  { 
    title: 'Applications of Depth First Search', 
    link: '#dfs-applications',
    subSections: [
      { 
        title: 'Tarjan\'s Strongly Connected Component Algorithm', 
        link: '#tscc',
        subSections: [
          { title: 'Visualisation', link: '#tscc-visualisation' },
          { title: 'Pseudocode', link: '#tscc-pseudocode' },
        ] 
      },
      { 
        title: 'Biconnected Algorithm', 
        link: '#bp',
        subSections: [
          { title: 'Visualisation', link: '#bc-visualisation' },
          { title: 'Pseudocode', link: '#bc-pseudocode' },
        ] 
      }
    ]
  },
  { 
    title: 'Applications of Breadth First Search', 
    link: '#bfs-applications',
    subSections: [
      { 
        title: 'Bipartiness Algorithm', 
        link: '#bp',
        subSections: [
          { title: 'Visualisation', link: '#bp-visualisation' },
          { title: 'Pseudocode', link: '#bp-pseudocode' },
        ] },
    ]
  },
  { title: 'Motivations', link: '#motivations' },
  { title: 'Implementation', link: '#implementation' },
  { title: 'Links', link: '#references' }
];

export default class AppContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuVisible: false
    };
  }

  toggleMenu() {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  render() {
    let cssClass = this.state.menuVisible ? 'AppContainer pad-left': 'AppContainer';
    return <div className={cssClass}>
      <BlogHeading/>
      <ContentsContainer sections={sections} visible={this.state.menuVisible} toggleMenu={() => this.toggleMenu()} />
      <BlogContainer sectionId={1}/>
      <AlgoVizContainer 
        id={1}
        name={'main-visualisation'}
        title={'Graph Traversal Algorithms'} 
        selectableAlgorithms={['DFS', 'BFS', 'TSC', 'APS', 'BA']}
        exampleGraph={'directedGraph'}/>
      <BlogContainer sectionId={2}/>
      <AlgoVizContainer 
        id={2}
        name={'dfs-visualisation'}
        title={'Depth First Search'} 
        selectableAlgorithms={['DFS', 'BFS']}
        exampleGraph={'directedTree'}/>
      <BlogContainer sectionId={3}/>
      <AlgoVizContainer 
        id={3}
        name={'bfs-visualisation'}
        title={'Breadth First Search'} 
        selectableAlgorithms={['BFS', 'DFS']}
        exampleGraph={'directedTree'}/>
      <BlogContainer sectionId={4}/>
      <AlgoVizContainer 
        id={4} 
        name={'tscc-visualisation'}
        title={'Tarjan\'s Algorithm'} 
        selectableAlgorithms={['TSC']}
        exampleGraph={'disconnectedComponents'}/>
      <BlogContainer sectionId={5}/>
      <AlgoVizContainer 
        id={5}
        name={'bc-visualisation'}
        title={'Articulation Point Search'} 
        selectableAlgorithms={['APS']} 
        graphType={'undirected'}
        exampleGraph={'biconnected'}/>
      <BlogContainer sectionId={6}/>
      <AlgoVizContainer 
        id={6}
        name={'bp-visualisation'}
        title={'Bipartiteness Algorithm'} 
        selectableAlgorithms={['BA']} 
        graphType={'undirected'}
        exampleGraph={'biconnectedBipartite'}/>
      <BlogContainer sectionId={'references'}/>
    </div>;
  }
};