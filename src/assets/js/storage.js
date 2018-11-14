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
* 网易云用户uid
* @type USERID_KEY: KEY值
* */
const USERID_KEY = '__mmPlayer_userID__';
//获取用户uid
export let getUserId = ()=> {
  return Number(storage.get(USERID_KEY, null));
}
//修改用户uid
export let setUserId = (uid)=> {
  storage.set(USERID_KEY, uid);
  return uid;
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

/*
* 播放模式
* @type  MODE_KEY: key值
*        HistoryListMAX: 最大长度
* */
const MODE_KEY = '__mmPlayer_mode__';
//获取播放模式
export function getMode(){
  return storage.get(MODE_KEY, null);
}
//修改播放模式
export function setMode(mode){
  storage.set(MODE_KEY, mode);
  return mode;
}

