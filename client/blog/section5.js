import React from 'react';

export default (<div>
      <p>In the real world the uses of finding SCCs can be useful for analysis and understanding of networks. For 
      example (just off the top of my head):</p>
      <ul>
            <li>If you apply them to networks of people and their relationships then you can identify communities and 
            friendship circles.</li>
            <li>In relation to Hacker News, and similar sites reliant upon upvoting, SCCs in a graph could represent and 
            identify Voting Rings.</li>
            <li>In package management a SCC would represent a cyclical dependency.</li>
      </ul>
      <h4><a name='tscc-pseudocode'>Pseudocode</a></h4>
      <p>This algorithm builds upon DFS using a stack and recursion to explore a pathway until it finds a leaf node or 
      a node already visisted. Unlike DFS though this algorithm does not take a start point, instead it ensures all 
      nodes are visited by instigating search on all nodes. At the end of each search cycle if the value of 
      node.visitIndex is the same as node.lowLink then it creates a new SCC and iteratively pops from the stack and adds
      these nodes to the SCC too until it reaches itself again.</p>

      <code>
            function <strong>tarjan-scc</strong>( graph )<br/>
            &nbsp;&nbsp;stack = new Stack()<br/>
            &nbsp;&nbsp;visitIndex = 0<br/>
            &nbsp;&nbsp;componentIndex = 0<br/>
            <br/>
            &nbsp;&nbsp;for ( node in graph )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if( !v.visitIndex )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( node )<br/>
            <br/>
            &nbsp;&nbsp;function search( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.visitIndex = visitIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = visitIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;node.onStack = true<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;stack.push( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;visitIndex = visitIndex + 1<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;for ( child in graph.childOf( node ) )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( !child.visitIndex )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( child )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = min( node.lowLink, child.lowLink )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else if ( child.onStack )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.lowLink = min( node.lowLink, child.visitIndex )<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if (node.lowLink == node.visitIndex) <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.componentIndex = componentIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentIndex = componentIndex + 1<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;do<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;member = stack.pop()<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;member.onStack = false<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;member.componentIndex = node.componentIndex<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while(node !== member)<br/>
      </code>

      <h3><a name='bc'>Identifying if a Graph is Biconnected</a></h3>
      <p>A graph is <a href="https://en.wikipedia.org/wiki/Biconnected_component">biconnected</a> if any node can be 
      removed and yet the graph remains connected (all nodes can still be reached from all other nodes). The key to 
      identifying is a graph is biconnected or not, is by searching for the presence of articulation points, or cut 
      vertices. These are points, that if removed from a graph results in an increase in the number of connected components
      within a graph and basically means that without their presence all remaining nodes would not be reachable from one 
      another.</p>

      <p>The most basic way to search for articulation points in a graph is to take a brute force approach and play out 
      all scenerios. Each node is removed from the graph and we then see if remaining nodes are all connected, if they 
      are not then the node that was removed is an articulation point. We place the removed node back in and then repeat
      the process for all remaining nodes.</p>

      <p>Whilst this approach will works its time complexity is relatively inefficient at O(N^2). There is an 
      alternative though that is an extension of DFS that's time complexity is  O(N). This algorithm is demonstrated 
      in the visualisation below.</p>
</div>);