export class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    let node = new Node(key, value);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
  }

  getItem(key) {
    let current = this.head;
    while (current !== null) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  removeItem(key) {
    let current = this.head;
    let prev = null;

    if (key === this.head.key) {
      this.head = current.next;
      return;
    }

    while (current !== null) {
      if (current.key === key) {
        prev.next = current.next;
        return;
      }
      prev = current;
      current = current.next;
    }
    return null;
  }

  getArray() {
    let result = [];

    let current = this.head;

    while (current !== null) {
      result.push(current);
      current = current.next;
    }
    return result;
  }
}
