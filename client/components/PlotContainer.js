import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import NodeModel from '../models/NodeModel';

import './PlotContainer.styl';

export default class PlotContainer extends Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
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
      .classed('done', self.props.done)
      .on('click', function() { // We need this context, cant use ES6 anonymous function
        if (d3.event.defaultPrevented) return;
        let coords = d3.mouse(this);
        self.props.addNode(coords[0], coords[1]);
      });

    let defs = svg.append('defs');

    defs.append('marker')
    .attr('id', 'arrowhead')
    .attr('class', 'ArrowHead')
    .attr('refX', 22) /*must be smarter way to calculate shift*/
    .attr('refY', 4)
    .attr('markerWidth', 12)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('path')
      .attr('d', 'M 0,0 V 8 L12,4 Z'); //this is actual shape for arrowhead

    defs.append('marker')
    .attr('id', 'arrowhead-traversed')
    .attr('class', 'ArrowHead traversed')
    .attr('refX', 22) /*must be smarter way to calculate shift*/
    .attr('refY', 4)
    .attr('markerWidth', 12)
    .attr('markerHeight', 8)
    .attr('orient', 'auto')
    .append('path')
      .attr('d', 'M 0,0 V 8 L12,4 Z'); //this is actual shape for arrowhead

    this.props.nodes.forEach(this.drawEdges.bind(this));
    this.props.nodes.forEach(this.drawNode.bind(this));
  }

  drawEdges(node) {
    let self = this;
    let svg = d3.select('.PlotContainer svg');

    node.children.forEach((childId) => {
      let child = self.props.nodes.find((n) => n.id === childId);

      var markerId = (child.visitedFrom === node.id) ? '#arrowhead-traversed': '#arrowhead';


      svg.append('line')
        .attr('class', 'Edge')
        .attr('marker-end', `url(${markerId})`)
        .attr('x1', node.x)
        .attr('y1', node.y)
        .attr('x2', child.x)
        .attr('y2', child.y)
        .classed('traversed', (child.visitedFrom === node.id));
    });
  }

  drawNode(node) {
    let self = this;
    
    let svg = d3.select('.PlotContainer svg');

    let drag = d3.behavior.drag()
      .on('dragstart', function(d) {
        self.props.updateNodes(self.props.nodes.map((n) => {
          if (n.id === node.id) {
            n.selected = true;
          }

          return n;
        }));
      })
      .on('dragend', function(d) {
        d3.event.sourceEvent.stopPropagation();
        
        let { offsetX: x, offsetY: y } = d3.event.sourceEvent;
        let connect = self.props.nodes.find((node) => {
          return (
            Math.abs(node.x - x) < node.size &&
            Math.abs(node.y - y) < node.size);
        });

        if (connect && connect.id !== node.id && node.children.filter((c) => c === connect.id).length === 0) {
          self.props.updateNodes(self.props.nodes.map((n) => {
            if (n.id === node.id) {
              n.selected = false;
              n.children.push(connect.id);
            }

            return n;
          }));
        }
      });

    let nodeElem = svg.append('circle')
      .attr('class', 'Node')
      .attr('id', 'node-'+node.id)
      .attr('cx', node.x)
      .attr('cy', node.y)
      .attr('r', node.size)
      .classed('selected', node.selected)
      .classed('visited', node.visited)
      .classed('current', node.current)
      .on('mouseover', function() {
        d3.select(this).classed('hover', true);
      })
      .on('mouseout', function() {
        d3.select(this).classed('hover', false);
      })
      .call(drag);

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