function Node(val) {
  var obj = {};
  obj.value = val || null;
  obj.previous = null;
  obj.next = null;

  obj.insertBefore = (sequence => {
    let previous = obj.previous;
    let next = obj.next;
    if (sequence) {
      sequence.head = obj;
      obj.previous = null;
    } else {
      let superPrevious = previous.previous;
      superPrevious.next = obj;
      obj.previous = superPrevious;
    }
    obj.next = previous;
    previous.previous = obj;
    if (previous) previous.next = next;
    if (next) next.previous = previous;
  }).bind(obj);

  obj.insertAfter = (sequence => {
    let previous = obj.previous;
    let next = obj.next;
    if (sequence) {
      sequence.head = next;
      next.previous = null;
    } else {
      previous.next = next;
      next.previous = previous;
    }
    obj.previous = next;
    obj.next = next.next;
    next.next = obj;
  }).bind(obj);

  obj.remove = (() => {
    if (obj.previous) obj.previous.next = obj.next;
    if (obj.next) obj.next.previous = obj.previous;
  }).bind(obj);

  return obj;
}

module.exports = function LinkedList() {
  let list = {};
  list.head = null;
  list.tail = null;
  list.addToTail = val => {
    let newNode = Node(val);
    if (!list.head) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      let temp = list.tail;
      temp.next = newNode;
      newNode.previous = temp;
      list.tail = newNode;
    }
    return newNode;
  };

  return list;
};
