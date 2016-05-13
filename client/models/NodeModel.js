export default class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = 10;
    this.selected = false;
    this.visited = false;
    this.current = false;
    this.children = [];
  };

  hasChildren() {
    return this.children && this.children.length > 0;
  }

  allChildrenVisited(node) {
    return this.children.reduce((reduction, child) => reduction && child.visited, true);
  }
}