export default class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = 10;
    this.selected = false;
    this.visited = false;
    this.visitIndex = null;
    this.visitedFrom = null;
    this.index = null;
    this.articulationPoint = false;
    this.lowLink = null;
    this.current = false;
    this.children = [];
    this.childVisitCount = 0;
  };

  hasChildren() {
    return this.children && this.children.length > 0;
  }

  reset() {
    this.visited = false;
    this.index = null;
    this.lowLink = null;
    this.current = false;
    this.visitedFrom = null;
    this.visitIndex =null;
    this.articulationPoint = false;
    this.childVisitCount = 0;
  }
}