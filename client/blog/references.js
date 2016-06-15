import React from 'react';
import ShareButtons from '../components/ShareButtons';

export default (<div>
      <p>The real world uses of testing whether a graph is bipartite, but it is a good introduction to the topic of 
      <a href="https://en.wikipedia.org/wiki/Graph_coloring"> Graph Coloring</a> which is an interesting area of study.</p>

      <h4><a name='bp-pseudocode'>Pseudocode</a></h4>
      <p>This algorithm, because it is an extension of BFS, uses a queue to maintain which node to visit next. For each 
      node it assigns a color based upon the colour(s) assigned to it's parents. Once all nodes have been assigned a color
      if we end with using 2 colours, then the graph is bipartite and its nodes can be seperated into two disjoint sets.</p>
      <code>
            function <strong>bipartiteness</strong>( graph )<br/>
            &nbsp;&nbsp;queue = new Queue()<br/>
            <br/>
            &nbsp;&nbsp;for ( node in graph.nodesWithoutParents() )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;search( node )<br/>
            <br/>
            &nbsp;&nbsp;return graph.groups().length == 2<br/>
            <br/>
            &nbsp;&nbsp;function search( node )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;queue.enqueue( node )<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;while ( !queue.empty() )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current = queue.dequeue()<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( !current.visited )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current.visited = true<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for ( child in current.unvisitedChildren() )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.enqueue( child )<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parentGroups = current.parentGroupsSet()<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( parentGroups.length == 0 )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current.group = 1<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else if ( parentGroups.length == 1 )<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current.group = ( parentGroups[0] == 1 ) ? 2 : 1<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current.group = parentGroups[parentGroups.length - 1] + 1<br/>
      </code>

      <h2><a name='motivations'>Motivations</a></h2>

      <p>It's quite safe to say that there is a lot of pent up frustration towards the hiring process in the software
      industry today [<a href="https://medium.com/@evnowandforever/f-you-i-quit-hiring-is-broken-bb8f3a48d324#.9ilm3a18l">1</a>
      , <a href="https://medium.com/@raiderrobert/interviewing-developers-9920fe93fa9e#.y1vu37ea2">2</a>
      , <a href="http://www.daedtech.com/hiring-is-broken/">3</a>
      , <a href="https://medium.freecodecamp.com/why-is-hiring-broken-it-starts-at-the-whiteboard-34b088e5a5db#.1ztmskxdq">4</a>
      ]. With the plethora of pathways one can take nowadays to become a software developer
      combined with how one can choose to apply themselves there is increasing chance for ambiguity when it comes to how
      to access the suitability of a candidate for a job.</p>

      <p>One of the topics that is often raised in these pieces is around some of the foundations of Computer Science -
      namely Data Structures and Algorithms. Whilst I am conflicted on their value in technical interviews 
      I found myself wondering about how we could help people that struggle with these concepts - I'd put myself in this pool. 
      In my opinion the delivery mechanisms used for educating someone about these topics are outdated and could be improved 
      (I always used to grow frustrated how lecture slides would often rely upon singular examples to explain algorithms). 
      Perhaps with a bit more thought to how to improve the learning experience we can help more people understand these basic concepts 
      that are essentially the building blocks for the subject of Computer Science.</p>

      <p>So I decided to create something that explains some of these concepts. The target requirements I felt were 
      important to maximise value and minimise complexity were the following:</p>

      <ul>
            <li>Visual - visually show the steps of the algorithm and how it traverses the graph</li>
            <li>Interactive - user can easily, and intuitively draw their own graphs and trees and run an algorithm 
            against it</li>
            <li>Examples - Access to pre-defined graphs relevant to each algorithm</li>
            <li>Running Commentary - Display the output of the algorithm at it runs</li>
            <li>Minimal - users can just click run to see the algorithms run and their output</li>
      </ul>

      <p>This blog marks the beginning. I've decided to focus on the topic of graph search algorithms here. The hope is 
      that anyone that is struggling with these algorithms and their applications can gain a better understanding 
      through running the algorithm and its variations with their own graphs and trees. </p>

      <p>By enabling readers to test out an algorithm with their own graph/tree structures I believe the reader can 
      learn and grok the concepts more efficiently. In many ways this reflects the intentions 
      of <a href="https://www.workshape.io">Workshape</a>, in so far as, we try to limit the dependence of words when 
      transferring information in order to minimise ambiguity!</p>

      <p>It must be said that there are already some great resources out there for teaching people about these types of complex subject 
      matter with visual cues. I have taken inspiration from two in particular:</p>

      <ol>
            <li><a href="http://visualgo.net/">Visualgo</a> - a very comprehensive resource for the visualisation 
            of algorithms and data structures. Kudos to the team behind this.</li>
            <li><a href="http://www.r2d3.us/visual-intro-to-machine-learning-part-1/">A Visual Introduction to 
            Machine Learning</a> - a personal favourite that tells the story of how various statistical techniques 
            can be used to build models to make predictions to classifcation problems - the visual explanation is 
            triggered by scrolling!</li>
      </ol>

      <h2><a name='implementation'>Implementation</a></h2>
      <p>For those who want to take a look at the <a href="https://github.com/Workshape/graph-algorithms-visualised">source code</a>, 
      check it out on our Github. It is written using React, D3 and Bluebird (Promise implementation).</p>

      <h2><a name='references'>Links</a></h2>
      <ol>
            <li><a href="https://medium.com/@evnowandforever/f-you-i-quit-hiring-is-broken-bb8f3a48d324#.9ilm3a18l">F**k You, I Quit - Hiring is Broken</a></li>
            <li><a href="https://medium.com/@raiderrobert/interviewing-developers-9920fe93fa9e#.y1vu37ea2">So Hiring is Broken - Let's Fix It</a></li>
            <li><a href="http://www.daedtech.com/hiring-is-broken/">Hiring is Broken... And It Isn't Worth Fixing</a></li>
            <li><a href="https://medium.freecodecamp.com/why-is-hiring-broken-it-starts-at-the-whiteboard-34b088e5a5db#.1ztmskxdq">Why is hiring broken? It starts at the whiteboard</a></li>
      </ol>

      <div className='instruction'>
        <h4>Feedback</h4>
        <p>If you have any feedback and would like to share it, or if you see any errors please email Gordon at gordon [at] workshape [dot] io. Also, if you would be interested in
        contributing in further content like this please do get in touch!</p>
      </div>

      <div className='BuiltBy large'>
        <span>Made with</span>
        <i className="fa fa-heart" aria-hidden="true"></i> 
        <span>
          by <a href='https://www.workshape.io'>
            <img src='assets/ws-logo.svg' alt='WorkShape.io' />
          </a>
        </span>
      </div>

      <ShareButtons/>
</div>);