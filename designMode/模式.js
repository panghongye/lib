class StateTracker {
  constructor() {
    this.observers = [];
    this.state = 10;
  }

  // 注册观察者
  registerObserver(ObserverFn) {
    if (typeof ObserverFn !== "function") return console.error('registerObserver 的第1参数必须是一个函数')
    this.observers.push(ObserverFn)
  }

  // 改变内部状态，触发状态的观察者列表
  change(val) {
    this.state = val;
    this.observers.forEach(observer => observer(val));
  }

}




class PublishOn {
  constructor() {
    this.eventPool = {};
  }

  //订阅
  on(topicName, callback) {
    if (typeof callback !== "function") return console.error('on 的第2参数必须是一个函数')

    let topic = this.eventPool[topicName];
    if (!topic) this.eventPool[topicName] = []
    this.eventPool[topicName].push(callback)
  }

  //发布
  publish(topicName, ...args) {
    let topic = this.eventPool[topicName];
    topic && topic.forEach(callback => callback(...args));
  }

  //移除
  off(topicName) {
    delete this.eventPool[topicName]
  }

}


