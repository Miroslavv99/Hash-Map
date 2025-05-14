import { th } from "date-fns/locale";
import { LinkedList } from "./linked-list";
import { Node } from "./linked-list";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    let primalNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primalNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode);
  }

  resize() {
    let oldBuckets = this.entries();
    this.capacity *= 2;

    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());

    oldBuckets.forEach((el) => {
      const [key, value] = el;
      const hashCode = this.hash(key);
      const bucketIndex = hashCode % this.capacity;
      this.buckets[bucketIndex].append(key, value);
    });
  }

  set(key, value) {
    let currentSize = this.length();
    let currentLoad = currentSize / this.capacity;

    if (currentLoad >= this.loadFactor) {
      this.resize();
    }

    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;
    const node = this.buckets[bucketIndex].getItem(key);

    if (node) {
      node.value = value;
    } else {
      this.buckets[bucketIndex].append(key, value);
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;
    const node = this.buckets[bucketIndex].getItem(key);

    if (node) {
      return node.value;
    } else {
      return null;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;
    const node = this.buckets[bucketIndex].getItem(key);

    if (node) {
      this.buckets[bucketIndex].removeItem(key);
      return true;
    } else {
      return null;
    }
  }

  length() {
    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      count += this.buckets[i].getArray().length;
    }
    return count;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  keys() {
    let result = [];

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].getArray().forEach((el) => {
        result.push(el.key);
      });
    }
    return result;
  }

  values() {
    let result = [];

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].getArray().forEach((el) => {
        result.push(el.value);
      });
    }
    return result;
  }

  entries() {
    let result = [];

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].getArray().map((el) => {
        result.push([el.key, el.value]);
      });
    }
    console.log(result);
    return result;
  }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
