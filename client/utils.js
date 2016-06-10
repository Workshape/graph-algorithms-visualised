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

export const getDirectedTree = () => {
  return [
    new NodeModel(1, 41, 50, [2,3, 5]),

    new NodeModel(2, 41, 120, [4,5], [1]),
    new NodeModel(3, 97, 90, [5,6,7], [1]),

    new NodeModel(4, 42, 190, [8,9], [2]),
    new NodeModel(5, 100, 190, [9], [1, 2,3]),

    new NodeModel(6, 160, 160, null, [3]),
    new NodeModel(7, 190, 135, null, [3]),

    new NodeModel(8, 42, 276, null, [4]),
    new NodeModel(9, 101, 278, null, [4, 5])
  ];
};

export const getDirectedGraph = () => {
  return [
    new NodeModel(1, 81, 138.3125, [2,3,7], []),
    new NodeModel(2, 178, 80.3125, [4,7], [1]),
    new NodeModel(3, 173, 198.3125, [5,7], [1]),
    new NodeModel(4, 321, 72.3125, [6], [2]),
    new NodeModel(5, 318, 209.3125, [6], [3]),
    new NodeModel(6, 432, 138.3125, [], [4,5,7]),
    new NodeModel(7, 319, 136.3125, [6], [1,2,3])
  ];
};

export const getDirectedCycle = () => {
  return [
      new NodeModel(1, 86, 76.3125, [2], [7]),
      new NodeModel(2, 86, 217.3125, [3], [1]),
      new NodeModel(3, 179, 222.3125, [4], [2]),
      new NodeModel(4, 287, 222.3125, [5], [3]),
      new NodeModel(5, 290, 144.3125, [6], [4]),
      new NodeModel(6, 284, 68.3125, [7], [5]),
      new NodeModel(7, 176, 68.3125, [1], [6])
  ];
};

export const getDisconnectedComponents = () => {
  return [
    new NodeModel(1, 62, 68.3125, [2], [3]),
    new NodeModel(2, 59, 231.3125, [3], [1]),
    new NodeModel(3, 211, 230.3125, [1], [2]),
    new NodeModel(4, 349, 60.3125, [5], [5]),
    new NodeModel(5, 344, 233.3125, [4], [4]),
    new NodeModel(6, 211, 65.3125, [7], [7]),
    new NodeModel(7, 207, 159.3125, [6], [6])
  ];
};

export const getNotBiconnected = () => {
  return [
    new NodeModel(1, 55, 32.3125, [2], [2]),
    new NodeModel(2, 179, 70.3125, [1,3], [1,3]),
    new NodeModel(3, 89, 175.3125, [2,4], [2,4]),
    new NodeModel(4, 218, 200.3125, [3], [3])
  ];
};

export const getBiconnected = () => {
  return [
    new NodeModel(1, 163, 54.265625, [3,2,5], [3,2,5]),
    new NodeModel(2, 301, 94.265625, [4,1,5], [4,1,5]),
    new NodeModel(3, 152, 213.265625, [1,4], [1,4]),
    new NodeModel(4, 317, 220.265625, [3,2], [3,2]),
    new NodeModel(5, 224, 143.265625, [1,2], [1,2])
  ];
};

export const getNotBipartite = () => {
  return [
    new NodeModel(1, 234, 30.265625, [2,3,5,6], [2,3,5,6]),
    new NodeModel(2, 168, 120.265625, [1,4,5], [1,4,5]),
    new NodeModel(3, 323, 109.265625, [1,6,7], [1,6,7]),
    new NodeModel(4, 119, 219.265625, [2], [2]),
    new NodeModel(5, 202, 216.265625, [1,2], [2,1]),
    new NodeModel(6, 281, 216.265625, [1,3], [1,3]),
    new NodeModel(7, 365, 213.265625, [3], [3])
  ];
};

export const getBipartite = () => {
  return [
    new NodeModel(1, 221, 27.3125, [2,3], [2,3]),
    new NodeModel(2, 169, 108.3125, [1,4,5,6], [1,4,5,6]),
    new NodeModel(3, 260, 109.3125, [1,6,7], [1,6,7]),
    new NodeModel(4, 114, 206.3125, [2,8,9], [2,8,9]),
    new NodeModel(5, 184, 206.3125, [2,10,11], [10,11,2]),
    new NodeModel(6, 237, 203.3125, [2,3,12,13], [3,12,2,13]),
    new NodeModel(7, 322, 203.3125, [3,13,14,15], [3,14,13,15]),
    new NodeModel(8, 77, 304.3125, [4], [4]),
    new NodeModel(9, 131, 300.3125, [4], [4]),
    new NodeModel(10, 163, 302.3125, [5], [5]),
    new NodeModel(11, 204, 302.3125, [5], [5]),
    new NodeModel(12, 238, 300.3125, [6], [6]),
    new NodeModel(13, 279, 301.3125, [6,7], [6,7]),
    new NodeModel(14, 326, 302.3125, [7], [7]),
    new NodeModel(15, 372, 301.3125, [7], [7])
  ];
};

export const getBiconnectedBipartite = () => {
  return [
    new NodeModel(1, 40, 37.3125, [7,2,3], [7,2,3]),
    new NodeModel(2, 39, 286.3125, [8,1,4], [8,1,4]),
    new NodeModel(3, 122, 114.3125, [1,6,4], [1,6,4]),
    new NodeModel(4, 122, 212.3125, [5,3,2], [5,3,2]),
    new NodeModel(5, 258, 209.3125, [6,4,8], [6,4,8]),
    new NodeModel(6, 251, 106.3125, [3,5,7], [3,5,7]),
    new NodeModel(7, 328, 27.3125, [1,8,6], [1,8,6]),
    new NodeModel(8, 330, 288.3125, [7,2,5], [7,2,5])
  ];
};

export const exampleGraphs = {
  directedTree: getDirectedTree,
  directedGraph: getDirectedGraph,
  directedCycle: getDirectedCycle,
  disconnectedComponents: getDisconnectedComponents,
  notBiconnected: getNotBiconnected,
  biconnected: getBiconnected,
  biconnectedBipartite: getBiconnectedBipartite,
  notBipartite: getNotBipartite,
  bipartite: getBipartite
};

export const getExampleGraph = (key) => {
  if (exampleGraphs[key]) {
    return exampleGraphs[key]();
  } else {
    return [];
  }
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

