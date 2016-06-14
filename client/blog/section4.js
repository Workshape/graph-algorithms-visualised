import React from 'react';

export default (<div>
      <p>Because the visualisation highlights the edges that are traversed by BFS you can see that it traverses the shortest path to each node - this property of 
      BFS makes it a good approach for this exact purpose.</p>

      <h3><a name='bfs-pseudocode'>Pseudocode</a></h3>
      <p>This pseudocode encapsulates the main principle of BFS using a queue to store nodes that are ready to be visited
      process and recursive function calls visit all reachable nodes.</p>
      <code>
            function <strong>bfs</strong>( graph, node )<br/>
            &nbsp;&nbsp;stack = new Queue()<br/>

            &nbsp;&nbsp;queue.enqueue( node )<br/>
            <br/>
            &nbsp;&nbsp;while (queue.notEmpty())<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;currentNode = queue.dequeue()<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if (!currentNode.visited)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentNode.visited = true<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while ( child = graph.nextUnvisitedChildOf( node ) )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.enqueue( child )<br/>
      </code>

      <h2><a name='observations'>Observations Depth First Search and Breadth First Search</a></h2>
      <p>If you have run both algorithms on the same structure you can make a few observations:</p>
      <ol>
            <li>The nodes of the graph are visited in a different order (if the depth is greater than 2)</li>
            <li>If there are multiple edges to a child node, the algorithms will traverse different edges</li>
            <li>BFS will always traverse the shortest path (based upon intermediate nodes visited) between two nodes</li>
            <li>Each algorithm will only traverse nodes reachable from the start node, disconnected components are not traversed. You can change the start node to see how this effects what is discovered.</li>
      </ol>

      <h2><a name='dfs-applications'>Applications of Depth First Search</a></h2>

      <p>The DFS algorithm by itself does not seem immediately useful, in comparison to BFS which is capable of finding shortest paths in nodes. In order to appreciate
      its usefulness you have to look to some of the ways in which it can be extended to be applied to certain problem domains. In this blog I am going to demonstrate 
      two examples, finding strongly connected components, and identifying whether a graph is biconnected or not.</p>

      <h3><a name='tscc'>Finding Strongly Connected Components</a></h3>

      <p>A Strongly Connected Component (SCC) is a subgraph where all nodes are reachable from every other node in the group. <a href="https://en.wikipedia.org/wiki/Robert_Tarjan">Robert Tarjan</a>, a 
      Professor of Computer Science from the US, created an algorithm for identifying SCCs in linear time, O(N), that is based upon DFS. If you take a look at the visualisation below you 
      can see algorithm identify the SCCs in a graph.</p>
</div>);