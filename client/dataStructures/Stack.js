export default class Stack {
  /**
   * Stack - a Last in Last out (LIFO) data structure
   * 
   * @constructor
   */
  constructor() {
    this.internal = [];
  }

  peek() {
    if (!this.internal || this.internal.length === 0) {
      throw new Error('Empty Stack');
    }

    return this.internal[this.internal.length - 1];
  }

  pop() {
    if (!this.internal || this.internal.length === 0) {
      throw new Error('Empty Stack');
    }
    
    return this.internal.pop();
  }

  push(value) {
    this.internal.push(value);
  }
}