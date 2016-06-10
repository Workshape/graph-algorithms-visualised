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

    let pop = this.internal.pop();
    console.log('Stack popped', this.internal, pop);
    return pop;
  }

  push(value) {
    this.internal.push(value);
    console.log('Stack pushed', this.internal, value);
  }
}