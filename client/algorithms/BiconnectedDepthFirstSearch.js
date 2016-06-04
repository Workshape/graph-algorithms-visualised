import _ from 'lodash';
import Promise from 'bluebird';

import { promiseSequence } from '../utils';

/**
 * Biconnected Depth First Search Algorithm Class
 */
export default class BiconnectedDepthFirstSearch {
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
    this.connected = [];
    this.explanation = [];
    this.currentVisitIndex = 1;
    this.pause = pause;
  }

  resetNodes() {
    this.currentVisitIndex = 1;
    this.nodes.forEach((n) => n.reset());
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
    
    return promiseSequence(searchNodes)
    .then(() => {
      console.log(this.connected);
      if (this.connected.reduce((prev, cur) => prev && cur, true)) {
        console.log('Biconnected!');
      } else {
        console.log('Not biconnected!!');
      }

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
        nodes: updateState
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
    if (parent) {
      console.log('Parent set', 'parent is', parent.id, 'child is', node.id);
    }
    if (!node) {
      return;
    }

    return this.updateComponent(node, parent)
    .then(() => {
      if (!node.visited) {
        this.markAsVisited(node);
      }

      if (!node.hasChildren() || this.allChildrenVisited(node)) {
        return this.moveToParent();
      } else {
        return this.moveToNextChild();
      }
    });
  }
  /**
   * Returns a node that sits at the top of the stack
   * 
   * @return {NodeModel} [description]
   *
   * @throws {Error} If the stack is empty
   */
  peek() {
    if (this.stack.length === 0) {
      return null;
    }

    return this.stack[this.stack.length - 1];
  }

  /**
   * Moves back to the parent node and triggers a UI update
   * 
   * @return {Promise}
   */
  moveToParent() {
    this.log(' | Move Up!');
    this.stack.pop();
    let currentNode = this.peek();
    if (!currentNode) {
      return Promise.resolve();
    }
    this.updateComponent(currentNode);
    return this.search(currentNode);
  }

  /**
   * Moves to the next available child
   * 
   * @return {Promise}
   */
  moveToNextChild() {
    this.log(' | Move Down!');
    let parent = this.peek();
    let sortedChildren = this.sortChildren(parent);

    let unvisitedChildren = sortedChildren.filter((x) =>  {
      let node = this.nodes.find((n) => n.id === x);
      return !node.visited;
    });

    if (unvisitedChildren.length === 0) {
      return Promise.resolve();
    } else {
      let nextId = unvisitedChildren.pop();
      let next = this.nodes.find((x) => x.id === nextId);
      return this.search(next, parent);
    }
  }

  /**
   * Marks a Node as visited, updates the stack and output order
   * 
   * @param  {NodeModel} node
   */
  markAsVisited(node) {
    this.log(` | Visit ${node.id}`);
    node.visited = true;
    node.visitIndex = this.currentVisitIndex++;
    this.stack.push(node);
  }

  /**
   * Sorts the children of a NodeModel by natural ordering
   * 
   * @param  {NodeModel} node
   * 
   * @return {Array}
   */
  sortChildren(node) {
    return node.children.sort((a,b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
  }

  /**
   * Checks to see if all children of a NodeModel has been visited or not
   * 
   * @param  {NodeModel} node
   * 
   * @return {Boolean}
   */
  allChildrenVisited(node) {
    let output = node.children.reduce((prev, current) =>  {
      let currentNode = this.nodes.find((x) => x.id === current);
      return prev && currentNode.visited;
    }, true);
    return output;
  }

  isNodeACutVertex(node) {
    if (node.children.length === 0) {
      return false;
    //} else if (!node.visitedFrom) {
      //return node.children.length > 1;
    } else {
      let ancestorBackEdgeChecks = node.children.map((c) => {
        let child = this.nodes.find((n) => n.id === c);
        let childChildren  = child.children.map((cc) => this.nodes.find((n) => n.id === cc));

        return childChildren.reduce((prev, cur) => prev || cur.visitIndex < node.visitIndex, false);
      });

      return ancestorBackEdgeChecks.reduce((prev, cur) => prev || cur, false);
    }
  }
}