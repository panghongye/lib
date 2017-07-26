class StateTracker {
  constructor() {
    this.observers = [];
    this.internalState = 10;
  }

  // 改变内部状态，触发状态的观察者列表
  change(val) {
    this.internalState = val;
    this.observers.forEach(observer => observer(val));
  }

  // 注册观察者
  registerObserver(ObserverFn) {
    this.observers.push(ObserverFn)
  }
}


class PubSubHandler {
  constructor() {
    this.eventPool = {};
  }

  //移除
  off(topicName) {
    delete this.eventPool[topicName]
  }

  //发布
  trigger(topicName, ...args) {
    this.eventPool[topicName] && this.eventPool[topicName].forEach(callback => callback(...args));
  }

  //订阅
  on(topicName, callback) {
    let topic = this.eventPool[topicName];
    if (!topic) {
      this.eventPool[topicName] = []
    }
    this.eventPool[topicName].push(callback)
  }
}

