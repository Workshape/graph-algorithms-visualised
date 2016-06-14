import React from 'react';

export default (<div>
      <p>The major real world use of identifying if a graph is biconnected or not is about identifying whether a graph 
      has redundancy in place if a node fails. This is especially important in communication network design and travel
      networks where it ensures resilience to one node failing.</p>

      <h4><a name='bc-pseudocode'>Pseudocode</a></h4>
      <p>Similarly to Tarjan's Strongly Connected Components Algorithm we maintain two important values for each node when traversing 
      the graph, lowLink and visitIndex with the additional property of the number of children visited. There are two 
      specific situations that indicate whether a node is an articulation point:</p>

      <ol>
            <li>The node is a the root of the DFS search tree and two or more of its children are visisted from it.</li>
            <li>The node is not a root but the lowLink value of ones of its children is more than its on visit 
            index.</li>
      </ol>

      <p>We do need to maintain a stack in this algorithm but we do make use of recursive function calls to traverse 
      down a path of the graph.</p>
      <code>
            function <strong>aps</strong>( graph, node )<br/>
            &nbsp;&nbsp;stack = new Stack()<br/>
            &nbsp;&nbsp;visitIndex = 0<br/>
            <br/>
            &nbsp;&nbsp;search( node )<br/>
            <br/>
            &nbsp;&nbsp;function search( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.visitIndex = visitIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = visitIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.childVisitCount = 0<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;visitIndex = visitIndex + 1<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;for ( child in graph.childOf( node ) )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( !child.visitIndex )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.childVisitCount = node.childVisitCount + 1<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;child.parent = node<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( child )<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = min( node.lowLink, child.lowLink )<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( !node.parent and node.childVisitCount > 1 )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.articulationPoint = true<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( node.parent and child.lowLink >= node.visitIndex )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.articulationPoint = true<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else if ( child != node.parent )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = min( node.lowLink, child.visitIndex )<br/>
      </code>

      <h2><a name='bfs-applications'>Applications of Breadth First Search</a></h2>
      <p>As mentioned earlier BFS has usefulness out of the box as it can identify the shortest path between two nodes 
      in an unweighted graph. You can see this behaviour by running the BFS example. In this blog we'll explore one 
      other application of BFS, using it to test if a graph is bipartite or not.</p>

      <h3><a name='bp'>Identifying is a Graph is Bipartite</a></h3>
      <p>A graph is bipartite if its nodes can be put into two disjoint sets such that every node in the first set 
      connects to one or more in the second. If you check out the visualisation below you can see a variation of BFS 
      that has been applied to see if a graph can be broken into these two disjoint sets. When a node is visited it is 
      coloured according the colour assigned to its parents:
      </p>
      <ul>
            <li>it it has no parents, it'll be set to color 1</li> 
            <li>if all it's parents have the same color, it will be set to the alternate of that color</li>
            <li>if it's parents have differing colors, it will be set a new color</li>
      </ul>

      <p>At the end of the process if only 2 colors are used then the graph is bipartite.</p>
</div>);