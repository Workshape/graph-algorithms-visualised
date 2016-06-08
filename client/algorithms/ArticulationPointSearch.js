import _ from 'lodash';
import Promise from 'bluebird';

import { promiseSequence } from '../utils';

/**
 * Depth First Search Algorithm Class
 */
export default class ArticulationPointSearch {
  /**
   * @constructor
   * 
   * @param  {Array} nodes     An array of NodeModel objects
   * @param  {React/Component} component A React Component
   * @param  {Number} pause    
   */
  constructor(nodes, component, pause = 500) {
    this.nodes = nodes;
    this.component = component;
    this.stack = [];
    this.visitOrder = [];
    this.explanation = [];
    this.currentVisitIndex = 0;
    this.pause = pause;
  }

  /**
   * Log a message (used for incremental updates about algorithms progress)
   * 
   * @param  {String} text
   */
  log(text) {
    console.log(text);
    this.explanation.push(text);
    this.component.setState({
      explanation: _.assign([],this.explanation)
    });
  }

  /**
   * Start the search process
   * 
   * @param  {NodeModel} startNode
   * 
   * @return {Promise}
   */
  start(startNode) {
    if (!this.nodes || this.nodes.length === 0) {
      this.log(' | No nodes to search!');
      return Promise.reject(new Error('No Nodes to search!'));
    }
    startNode = startNode || this.nodes[0];

    this.log(` | Start at ${startNode.id}`);
    return this.search(startNode)
    .then(() => {
      this.log(' | Search Complete!');
      let unvisitedPoints = this.nodes.filter((n) => !n.visited);
      let articulationPoints = this.nodes.filter((n) => n.articulationPoint);
      if (unvisitedPoints.length === 0 && articulationPoints.length === 0) {
        this.log(' | This graph is Biconnected!');
      } else {
        this.log(' | This graph is not Biconnected');
        if (articulationPoints.length > 0) {
          this.log(` | Articulation Points: ${articulationPoints.map((n) => n.id).join(', ')}`);
        }
        if (unvisitedPoints.length > 0) {
          this.log(` | Unvisited Points: ${unvisitedPoints.map((n) => n.id).join(', ')}`);
        }
      }
    });
  }

  /**
   * Update the component's state with the nodes array that
   * reflects current status of search
   * 
   * @param  {NodeModel} currentNode
   * 
   * @return {Promise}
   */
  updateComponent(currentNode, parentNode) {
    return Promise.resolve()
    .then(() => {
      let updateState = this.nodes.map((node) => {
        if (node.id === currentNode.id) {
          node = currentNode;
          node.current = true;
        } else {
          node.current = false;
        }
        return node;
      });

      this.component.setState({
        nodes: updateState,
        visitOrder: _.assign([], this.visitOrder)
      });

      return Promise.delay(this.pause);
    });
  }

  /**
   * Search a node
   *
   *  - This function triggers an update to the UI
   *  - If the node has not been visited it marks it as visited
   *  - If the node has no children or all children have been visited it will move back to parent
   *  - If the node has children that are still be visited it will move to next available child
   * 
   * @param  {NodeModel} node
   * 
   * @return {Promise}
   */
  search(node, parent) {
    this.log(` | Visit ${node.id}`);
    node.childVisitCount = 0;
    node.visited = true;
    
    node.visitIndex = this.currentVisitIndex++;
    node.lowLink = node.visitIndex;

    return this.updateComponent(node, parent)
      .then(() => {
        return promiseSequence(node.children.map((c) => () => {
          var child = this.nodes.find((n) => n.id === c);
          if (!child.visited) {
            node.childVisitCount++;
            child.visitedFrom = node.id;

            return this.search(child, node)
            .then(() => {
              node.lowLink = Math.min(node.lowLink, child.lowLink);
              
              if (node.visitedFrom === null && node.childVisitCount > 1) {
                this.log(' | Node is root and has more than one child - it\'s an articulation point!');
                node.articulationPoint = true;
              } else if (node.visitedFrom !== null && child.lowLink >= node.visitIndex) {
                this.log(` | Node ${node.id} - parent ${node.visitedFrom}`);
                this.log(' | Node is not root but one of it\'s children has a back link to an ancestor - it\'s an articulation point!');
                node.articulationPoint = true;
              }
            });
          } else {
            return Promise.resolve()
              .then(() => {
                if (child.id !== node.visitedFrom) {
                  node.lowLink = Math.min(node.lowLink, child.visitIndex);
                }
              });
          }
        }));
      });
  }
}