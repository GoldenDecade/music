import TempToast from './mm-toast'
let instance, showToast = false, time; // 存储toast显示装填
const mmToast = {
  install(Vue, options = {}) {
    let opt = TempToast.data();// 获取组件中的默认配置
    Object.assign(opt, options, duration); //合并配置
    Vue.prototype.$mmToast = (message, position) => {
      if(showToast) {
        clearTimeout(time);
        instance.vm.visible = showToast = false;
        document.body.removeChild(instanve.vm.$el);
      }
      if(message) {
        opt.message = message;
      }
      if(position) {
        opt.position = position;
      }
      if(duration) {
        opt.duration = duration;
      }
      let TempToastConstructor = Vue.extend(TempToast);
      instance = new TempToastConstructor({
        data: opt
      })
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.visible = showToast = true;
      time = setTimeout(()=> {
        instance.vm.visible = showToast = false;
        document.body.removeChild(instance.vm.$el);
      }, opt.duration)
    }
  }
}
export default mmToast;
