export default class Queue {
  /**
   * Queue - a First in - First Out (FIFO) data structure
   * 
   * @constructor
   */
  constructor() {
    this.internal = [];
  }

  isNotEmpty() {
    return (this.internal && this.internal.length > 0);
  }

  enqueue(value) {
    this.internal.push(value);
  }

  dequeue() {
    if (!this.isNotEmpty()) {
      throw new Error('Queue is empty!');
    }

    return this.internal.shift();
  }
}