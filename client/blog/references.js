import React from 'react';

export default (<div>
      <h2>Motivations</h2>

      <p>It's quite safe to say that there is a lot of pent up frustration towards the hiring process in the software
      industry today [1,2,3,4]. With the plethora of pathways one can take nowadays to become a software developer
      combined with how one can choose to apply themselves there is increasing chance for ambiguity when it comes to how
      to access the suitability of a candidate for a job.</p>

      <p>One of the topics that is often raised in these pieces is around some of the foundations of Computer Science -
      namely Data Structures and Algorithms. Whilst I find myself conflicted as to the value of focussing on these
      aspects in technical interviews I found myself wondering about how we could help people that struggle with
      these concepts (I'd define myself as one of these people). In my opinion the delivery mechanisms used for
      educating someone about these topics could be improved (I always used to grow frustrated how lecture slides 
      would often rely upon singular examples to explain algorithms). Perhaps with a bit more thought to how to improve 
      the learning experience we can help more people understand these basic concepts that are essentially the building
      blocks for the subject of Computer Science.</p>

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
      through running the algorithm and it's variations with their own graphs and trees. </p>

      <p>By enabling readers to test out an algorithm with their own graph/tree structures I believe the reader can 
      learn and grok the concepts more efficiently. In many ways this reflects the intentions 
      of <a href="https://www.workshape.io">Workshape</a>, in so far as, we try to limit the dependence of words when 
      transferring information in order to minimise ambiguity!</p>

      <p>It must be said that there are already some great resources out there for teaching people about these types of complex subject 
      matter with visual cues and I have taken inspiration from two in particular:</p>

      <ol>
            <li><a href="http://visualgo.net/">Visualgo</a> - a very comprehensive resource for the visualisation 
            of algorithms and data structures. Kudos to the team behind this.</li>
            <li><a href="http://www.r2d3.us/visual-intro-to-machine-learning-part-1/">A Visual Introduction to 
            Machine Learning</a> - a personal favourite that tells the story of how various statistical techniques 
            can be used to build models to make predictions to classifcation problems - the visual explanation is 
            triggered by scrolling!</li>
      </ol>

      <h2>References</h2>
      <ol>
            <li><a href="https://medium.com/@evnowandforever/f-you-i-quit-hiring-is-broken-bb8f3a48d324#.9ilm3a18l">F**k You, I Quit - Hiring is Broken</a></li>
            <li><a href="https://medium.com/@raiderrobert/interviewing-developers-9920fe93fa9e#.y1vu37ea2">So Hiring is Broken - Let's Fix It</a></li>
            <li><a href="http://www.daedtech.com/hiring-is-broken/">Hiring is Broken... And It Isn't Worth Fixing</a></li>
            <li><a href="https://medium.freecodecamp.com/why-is-hiring-broken-it-starts-at-the-whiteboard-34b088e5a5db#.1ztmskxdq">Why is hiring broken? It starts at the whiteboard</a></li>
      </ol>
</div>);