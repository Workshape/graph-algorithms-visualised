import React from 'react';

export default (<div>
      <p>Because the visualisation highlights the edges that are traversed by BFS you can see that it traverses the shortest path to each node - this property of 
      BFS makes it a good approach for this exact purpose.</p>

      <h3>Pseudocode</h3>
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

      <h3>Observations Depth First Search and Breadth First Search</h3>
      <p>If you have run both algorithms on the same structure you can make a few observations:</p>
      <ol>
            <li>The nodes of the graph are visited in a different order</li>
            <li>If there are multiple edges to a child node, the algorithms will traverse different edges</li>
            <li>BFS will always traverse the shortest path (based upon intermediate nodes visited) between two nodes</li>
            <li>Each algorithm will only traverse nodes reachable from the start node, disconnected components are not traversed. You can change the start node to see how this effects what is discovered.</li>
      </ol>

      <p></p>
</div>);