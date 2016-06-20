import React from 'react';

export default (<div>
      <p>You can see in the visualisation after the algorithm completes the edges that the algorithm traversed in order to first <strong>visit</strong> a node.
      It is important to take note of this when comparing to Breadth First Search. The visit index of each node is labelled in red.</p>

      <h3><a name='dfs-pseudocode'>Pseudocode</a></h3>
      <p>This pseudocode encapsulates the main principle of DFS using a stack and recursive function calls to explore down a pathway to a leaf node before
      backtracking, using a stack, and looking for other routes to other unvisited children.</p>
      <code>
            function <strong>dfs</strong>( graph, node )<br/>
            &nbsp;&nbsp;stack = new Stack()<br/>
            &nbsp;&nbsp;search(node)<br/>
            <br/>
            &nbsp;&nbsp;function search( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if ( !node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if ( !node.visited )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack.push( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.visited = true<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if ( graph.nodeHasUnvisitedChildren( node ) )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( graph.nextUnvisitedChildOf( node ) )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;else<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( stack.pop() )<br/>
      </code>

      <p>The additional functionality in the visualisation for tracking the order in which each node is visited is omitted.</p>

      <h2><a name='bfs'>Breadth First Search</a></h2>

      <p>Whilst DFS goes as deep as possible until it reaches a dead end and then back tracks BFS queues up all nodes reachable at a certain depth 
      and then increases the depth until all nodes are visited. Check out the visualisation below, the same example graph is loaded, pay attention
      to the different visit order and edges traversed by each algorithm.</p>
</div>);