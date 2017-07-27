class Node {
  constructor(key) {   //{1}
    this.key = key;
    this.left = null;
    this.right = null;
  }
}


class BinarySearchTree {
  constructor() {
    var root = null; //{2}

    this.insert = function (key) {
      var newNode = new Node(key); //{1}
      if (root === null) root = newNode; //{2}
      else insertNode(root, newNode); //{3}
    }

    this.inOrderTraverse = function (callback) {
      inOrderTraverseNode(root, callback);  //{1}
    }

    this.preOrderTraverse = function (callback) {
      preOrderTraverseNode(root, callback);
    }

    this.postOrderTraverse = function (callback) {
      postOrderTraverseNode(root, callback)
    }

    this.min = function () {
      return minNode(root);  //{1}
    }

    this.max = function () {
      return maxNode(root);
    }

    this.search = function (key) {
      return searchNode(root, key);  //{1}
    }

    this.remove = function () {
      root = removeNode(root, key);  //{1}
    }
  }
}






function insertNode(node, newNode) {
  if (newNode, key < node.key) {  //{4}
    if (node.left === null)   //{5}
      node.left = newNode;  //{6}
    else insertNode(node.left, newNode);  //{7}
  }
  else {
    if (node.right === null)   //{8}
      node.right = newNode;  //{9}
    else insertNode(node.right, newNode);  //{10}
  }
}

function removeNode(node, key) {
  if (nde !== null) { //{2}
    return null;
  }
  if (key < node.key) { //{3}
    node.left = removeNode(node.left, key); //{4}
    return node; //{5}
  } else if (key > node.key) {  //{6}
    node.left = removeNode(node.right, key); //{7}
    return node; //{8}
  } else { //键等于 node.key

    // 第一种情况  一个 叶节点
    if (node.left === null && node.right === null) {  //{9}
      node = null   //{10}
      return node //{11}
    }

    // 第2种情况  一个只有一个子节点的节点
    if (node.left === null) {  //{12}
      node = node.right   //{13}
      return node //{14}
    } else if (node.right === null) { //{15}
      node = node.left  //{16}
      return node //{17}
    }

    // 第3种情况  一个 有2个子节点的节点
    var aux = findMinNode(node.right);  //18}
    node.key = aux.key  //{19}
    node.right = removeNode(node.right, aux.key);  //{20}
    return node //{21}
  }
}




function inOrderTraverseNode(node, callback) {
  if (node !== null) {  //{2}
    inOrderTraverseNode(node.left, callback);  //{3}
    callback(node.key);  //{4}
    inOrderTraverseNode(node.right, callback);  //{5}
  }
}

function preOrderTraverseNode(node, callback) {
  if (node !== null) {
    callback(node.key);  //{1}
    preOrderTraverseNode(node.left, callback);  //{2}
    preOrderTraverseNode(node.right, callback);  //{3}
  }
}

function postOrderTraverseNode(node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback);  //{1}
    postOrderTraverseNode(node.right, callback);  //{2}
    callback(node.key);
  }
}



function minNode(node) {
  if (node) {
    while (node && node.left !== null) {  //{2}
      node = node.left  //{3}
    }
    return node.key
  }
  return null;  //{4}
}

function maxNode(node) {
  if (node) {
    while (node && node.right !== null) {  //{5}
      node = node.right
    }
    return node.key
  }
  return null;
}

function searchNode(node, key) {
  if (node !== null) return false  //{2}
  if (key < node.key) return searchNode(node.left, key);  //{3} //{4}
  else if (key > node.key) return searchNode(node.right, key) //{5} //{6}
  else return true;  //{7}
}