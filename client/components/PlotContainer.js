import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import NodeModel from '../models/NodeModel';

import './PlotContainer.styl';

export default class PlotContainer extends Component {
  static propTypes = {
    currentId: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired,
    visitOrder: PropTypes.array.isRequired,
    addNode: PropTypes.func.isRequired,
    updateNodes: PropTypes.func.isRequired
  };

  render() {
    return <div className='PlotContainer'></div>;
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    let self = this;

    d3.selectAll('.PlotContainer svg').remove();

    let svg = d3.select('.PlotContainer')
      .append('svg')
      .on('click', function() { // We need this context, cant use ES6 anonymous function
        let coords = d3.mouse(this);
        self.props.addNode(coords[0], coords[1]);
      });

    this.props.nodes.forEach(this.drawEdges.bind(this));
    this.props.nodes.forEach(this.drawNode.bind(this));
  }

  clickNode(id) {
    let self = this;
    return () => {
      d3.event.stopPropagation();
      let nodes = self.props.nodes;
      let newNodes;

      if (nodes.filter((n) => n.selected).length === 1) {
        let parent = nodes.find((n) => n.selected);
        let child = nodes.find((n) => n.id === id);

        if (parent.id === child.id) {
          newNodes = nodes.map((n) => {
            n.selected = false;
            return n;
          });
        } else {
          newNodes = nodes.map((n) => {
            if (n.id === parent.id) {
              n.selected = false;
              if (n.children.filter((c) => c === child.id).length === 0) {
                n.children.push(child.id);
              }
              
            }

            if (n.id === child.id) {
              n.selected = true;
            }
            return n;
          });
        }
      } else {
        newNodes = self.props.nodes.map((n) => {
          if (n.id === id) {
            n.selected = !n.selected;
          }
          return n;
        });
      }

      this.props.updateNodes(newNodes);
    };
  }

  drawEdges(node) {
    let self = this;
    let svg = d3.select('.PlotContainer svg');

    node.children.forEach((childId) => {
      let child = self.props.nodes.find((n) => n.id === childId);

      svg.append('line')
        .attr('class', 'edge')
        .attr('x1', node.x)
        .attr('y1', node.y)
        .attr('x2', child.x)
        .attr('y2', child.y);
    });
  }

  drawNode(node) {
    let self = this;
    let svg = d3.select('.PlotContainer svg');

    svg.append('circle')
      .attr('class', 'Node')
      .attr('id', 'node-'+node.id)
      .attr('cx', node.x)
      .attr('cy', node.y)
      .attr('r', node.size)
      .classed('selected', node.selected)
      .classed('visited', node.visited)
      .classed('current', node.current)
      .on('click', self.clickNode(node.id))
      .on('mouseover', function() {
        d3.select(this).classed('hover', true);
      })
      .on('mouseout', function() {
        d3.select(this).classed('hover', false);
      });

    svg.append('text')
      .attr('class', 'Node-label')
      .attr('id', 'label-'+node.id)
      .attr('x', node.x + node.size*1.2)
      .attr('y', node.y + node.size*1.5)
      .text(node.id);

    let visited = this.props.visitOrder.findIndex((v) => v.id === node.id);

    if (visited > -1) {
      svg.append('text')
        .attr('class', 'Node-visitLabel')
        .attr('id', 'visitlabel-'+node.id)
        .attr('x', node.x - (node.size*1.5))
        .attr('y', node.y + node.size*1.5)
        .text(visited + 1);
    }
  }
};