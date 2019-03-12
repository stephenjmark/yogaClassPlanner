function Node(val) {
  var obj = {};
  obj.value = val || null;
  obj.previous = null;
  obj.next = null;

  obj.insertBefore = (node => {
    obj.previous.next = obj.next;
    obj.next.previous = obj.previous;
    obj.next = node;
    node.previous = obj;
  }).bind(obj);

  obj.insertAfter = (() => {
    obj.previous.next = obj.next;
    obj.next.previous = obj.previous;
    obj.next.next = obj;
    obj.previous = obj.next;
    obj.next = obj.next.next;
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
