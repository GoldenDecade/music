const storage = {
  get(key, defa = []){ // 默认获取值的类型为[];  可以传入类型
    if(window.localStorage) {
      return localStorage.getItem(key) ? (Array.isArray(defa) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)) : defa;
    }
  },
  set(key, val) {
    if(window.localStorage) {
      localStorage.setItem(key, val);
    }
  },
  clear(key) {
    if(window.localStorage) {
      localStorage.removeItem(key);
    }
  }
}


/*
* 版本号
* @type  VERSION_KEY: key值
* */
const VERSION_KEY = 'player_version';
//获取版本号
export let getVersion = ()=> {
  let version = storage.get(VERSION_KEY, '');
  return version;
}
//修改版本号
export let setVersion = (version)=> {
  storage.set(VERSION_KEY, version);
  return version;
}
