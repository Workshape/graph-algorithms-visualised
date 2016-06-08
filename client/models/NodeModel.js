export default class Node {
  constructor(id, x, y, children, parents) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.children = children || [];
    this.parents = parents || [];

    this.size = 10;
    this.selected = false;
    this.current = false;

    this.visited = false;
    this.visitIndex = null;
    this.visitedFrom = null;

    this.articulationPoint = false;
    this.lowLink = null;
    this.group = null;
    
    this.childVisitCount = 0;
  };

  hasChildren() {
    return this.children && this.children.length > 0;
  }

  reset() {
    this.visited = false;
    this.lowLink = null;
    this.current = false;
    this.visitedFrom = null;
    this.visitIndex =null;
    this.articulationPoint = false;
    this.childVisitCount = 0;
    this.group = null;
  }
}