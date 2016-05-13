import _ from 'lodash';
import Promise from 'bluebird';

/**
 * Depth First Search Algorithm Class
 */
export default class DepthFirstSearch {
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
    .catch((e) => {
      this.log(e.message);
      this.log(' | Search Steps');
      this.log(' | ------------');
      this.visitOrder.forEach((node, id) => this.log(` | Step ${id+1} -> Node ${node.id}`) );
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
      throw new Error(' | Stack empty, DFS complete!');
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
    this.stack.push(node);
    this.visitOrder.push(node);
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
}