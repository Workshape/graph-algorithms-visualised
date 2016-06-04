import Promise from 'bluebird';
import _ from 'lodash';

import NodeModel from './models/NodeModel';

/**
 * Creates a sequence of promises to processed
 * 
 * @param  {Array of tasks} tasks
 * 
 * @return {Promise}
 */
export const promiseSequence = (tasks) => {
  let current = Promise.resolve(true);

  tasks.map((task) => {
    current = current.then(task);
  });

  return current;
};

/**
 * While loop promisified
 * 
 * @param  {Function} predicate function that returns boolean
 * @param  {Function} action block of action to complete
 * 
 * @return {Promise}
 */
export const promiseWhile = (predicate, action) => {
  let loop = () => {
    if (!predicate()) {
      return;
    }
    return Promise.resolve(action()).then(loop);
  };

  return Promise.resolve(true).then(loop);
};

/**
 * Generate an example graph
 * 
 * @param  {Number} childCount number of children for each parent
 * @param  {Number} maxDepth   max depth of generated graph
 * @param  {Number} maxX       maximum value of x coord
 * @param  {Number} maxY       maximum value of y coord
 * @param  {Number} padding    padding on outside of drawn graph
 * 
 * @return {Array}             set of Nodes
 */
export const generateTree = (childCount, maxDepth, maxX, maxY, padding, prob) => {
  prob = prob || 0.7;
  var root = new NodeModel(1, maxX/2, padding);
  var nodes = [];
  var currentDepth = 1;
  let totalNodes = _.range(1, maxDepth+1).reduce((sum, curr) => sum + Math.pow(childCount, curr), 0) + 1;
  let bottomNodes = Math.pow(childCount, maxDepth);

  return generateChildren(maxX, maxY, root, currentDepth);


  function generateChildren(mx, my, parent, currentDepth) {
    let maxId = (nodes.length > 0) ? nodes[nodes.length-1].id : root.id;
    let nodesAtDepth = Math.pow(childCount, currentDepth);
    let sectionSize = (mx - padding) / nodesAtDepth;
    let sectionSpread = sectionSize * childCount;
    let sectionStart = parent.x - (sectionSpread/2) + (sectionSize/2);
    let xrange = _.range(sectionStart, sectionStart + sectionSpread, sectionSize);
    let dy = Math.floor( (my - (padding*2)) / maxDepth);

    let children = _.range(childCount).map((i) => {
      return new NodeModel(++maxId, xrange[i], parent.y + dy);
    });

    children = children.filter((c) => {
      return Math.random() <= prob;
    });

    children.forEach((child) => {
      parent.children.push(child.id);
    });

    nodes = _.concat(nodes.filter((n) => n.id !== parent.id), parent, children);

    if (currentDepth < maxDepth) {
      return _.uniq(_.flatMap(children, (child) => generateChildren(mx, my, child, currentDepth + 1)));
    } else {
      return nodes;
    }
  }
};

