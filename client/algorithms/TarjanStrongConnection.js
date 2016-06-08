import _ from 'lodash';
import Promise from 'bluebird';

import { promiseSequence } from '../utils';
import Stack from '../dataStructures/Stack';

/**
 * Tarjan Strongly Connected Components Graph Algorithm Class
 */
export default class TarjanStrongConnection {
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
    this.visitIndex = 0;
    this.stack = new Stack();
    this.visitOrder = [];
    this.explanation = [];
    this.components = [];
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

    let searchNodes = this.nodes.map((node) => () => this.search(node));
    
    return promiseSequence(searchNodes)
    .then(() => {
      this.log(' | Strongly Connected Components');
      this.log(' | ------------');
      this.components.forEach((component, id) => this.log(` | Component ${id} -> ${component.join(', ')}`) );
      this.component.setState({
        components: _.assign([], this.components)
      });
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
          node.current = true;
          if (parentNode) {
            node.visitedFrom = parentNode.id;
          }
        } else {
          node.current = false;
        }

        return node;
      });
      this.component.setState({
        nodes: updateState,
        components: _.assign([], this.components),
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
    if (!node) {
      return Promise.resolve();
    }

    if (node.visitIndex !== null) {
      return Promise.resolve();
    }

    return this.updateComponent(node, parent)
    .then(() => {
      this.markAsVisited(node);

      let childTasks = node.children.map((childId) => {
        let child = this.nodes.find((x) => x.id === childId);
        if (child.visitIndex === null) {
          return () => {
            return this.search(child, node).then(() => {
              let updatedChild = this.nodes.find((x) => x.id === childId);
              node.lowLink = Math.min(node.lowLink, updatedChild.lowLink);
              return Promise.resolve();
            });
          };
        } else if (child.onStack) {
          return () => {
            node.lowLink = Math.min(node.lowLink, child.visitIndex);
            return Promise.resolve();
          };
        } else {
          return () => { 
            return Promise.resolve();
          };
        }
      });

      return promiseSequence(childTasks)
      .then(() => {
        if (node.lowLink === node.visitIndex) {
          let component = [ node.id ];
          let otherNodeId = this.stack.pop();
          let otherNode = this.nodes.find((x) => x.id === otherNodeId);
          otherNode.onStack = false;
          while (otherNodeId !== node.id) {
            component.push(otherNode.id);
            otherNodeId = this.stack.pop();
            otherNode = this.nodes.find((x) => x.id === otherNodeId);
            otherNode.onStack = false;
          }
          this.components.push(component);
          return Promise.resolve();
        }
      });
    });
  }

  /**
   * Marks a Node as visited, updates the stack and output order
   * 
   * @param  {NodeModel} node
   */
  markAsVisited(node) {
    this.log(` | Visit ${node.id}`);
    node.visited = true;
    node.visitIndex = this.visitIndex;
    node.lowLink = this.visitIndex;
    node.onStack = true;
    this.visitIndex++;
    this.stack.push(node.id);
    this.visitOrder.push(node);
  }
}