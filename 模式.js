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


class Store {
  constructor(initState = {}) {
    if (typeof initState !== 'object' || initState === null) throw new TypeError('[Store] Init state must be a object.')

    const _state = this._state = deepclone(initState)
    this.state = this._hookState(_state)
  }

  // 禁止直接修改
  _hookState(_state) {
    const state = {}

    Object.keys(_state).forEach(key => {
      if (typeof _state[key] === 'object' && _state[key] !== null) _state[key] = this._hookState(_state[key])
      else if (typeof _state[key] === 'function') throw new TypeError('[Store] state cannot save function.')

      Object.defineProperty(state, key, {
        enumerable: true,
        configurable: true,

        get() {
          return _state[key]
        },

        set(newVal) {
          throw new TypeError('[Store] mutate state failed. Use .mutate() to mutate state')
        }

      })
    })
    return state
  }

  mutate(fn) {
    const newState = this._state = deepclone(fn.apply(null, this._state))
    this.state = this._hookState(newState)
  }
}
