// import Dictionary from './Dictionary'

class Graph {
  constructor() {
    this.vertices = [] //1
    // var adjList = new Dictionary(); //2
    this.adjList = new Map() //2
  }

  addVertex(v) {
    this.vertices.push(v) //3
    this.adjList.set(v, []) //4
  }

  addEdge(v, w) {
    this.adjList.get(v).push(w) //5
    this.adjList.get(w).push(v) //6
  }

  toString() {
    var { s = '', vertices, adjList } = this
    for (let i = 0; i < vertices.length; i++) {
      //10
      s += vertices[i] + '->'
      var neighbors = adjList.get(vertices[i]) //11
      for (let j = 0; j < neighbors.length; j++) {
        //12
        s += neighbors[j] + ''
      }
      s += '\n' //13
    }
    return s
  }

  initializeColor() {
    // 白 顶点未访问
    // 灰 顶点访问 未探索
    // 白 顶点访问 且探索
    var { color = [], vertices } = this
    for (let i = 0; i < vertices.length; i++) color[vertices[i]] = 'white' //1
    return color
  }

  bfs(v, callback) {
    var { vertices, adjList } = this
    var color = this.initializeColor() //2
    var queue = new Queue() //3
    queue.enqueue(v) //4
    while (!queue.isEmpty()) {
      //5
      var u = queue.dequeue(),
        neighbors = adjList.get(u) //6 7
      color[u] = 'grey' //8
      for (var i = 0; i < neighbors.length; i++) {
        //9
        var w = neighbors[i] //10
        if (color[w] === 'white') {
          //11
          color[w] = 'grey' //12
          queue.enqueue(w) //13
        }
      }
      color[u] = 'black' //14
      callback && callback(u) //15
    }
  }
}

//test
graph = new Graph()
myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] //7
for (let i = 0; i < myVertices.length; i++) {
  //8
  graph.addVertex(myVertices[i])
}
graph.addEdge('A', 'B') //9
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
