class HistoryRoute{
  constructor(){
    this.current = null;
  }
}

class vueRouter{
  constructor(options){
    // options:使用时传过来的参数
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    this.history = new HistoryRoute;
    this.init();
    this.routesMpa = this.createMap(this.routes);
  }
  init(){
    if(this.mode=='hash'){
      location.hash?'':location.hash = '/';
      window.addEventListener('load',()=>{
        this.history.current = location.hash.slice(1);
      })
      window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1);
      })
    }else{
      location.pathname?'':location.pathname = '/';
      window.addEventListener('load',()=>{
        this.history.current = location.pathname;
      })
      window.addEventListener('popstate',()=>{
        this.history.current = location.pathname;
      })
    }
  }
  /** 把传入的数据转换成更好处理数据的键值对的形式 */
  createMap(routes){
    return routes.reduce((memo, current)=>{
      memo[current.path] = current.component;
      return memo;
    },{})
  }
}
/** 注入vue生命周期中 */
vueRouter.install=function (vue) {
  vue.mixin({
    beforeCreate(){
      // this.$options就是在mian.js中new vue传入的对象
      if(this.$options&&this.$options.router){
        // 把传入的实例传入this,方便使用和监听
        this._root = this;
        this._router = this.$options.router;
        /**监听 */
        vue.util.defineReactive(this,'current',this._router.history);
      }else{
        this._root = this.$parent._root;
      }
    }
  })
  /** 渲染组件 */
  vue.component('router-view',{
    render(h){
      let current = this._self._root._router.history.current;
      let routesMpa = this._self._root._router.routesMpa;
      return h(routesMpa[current]);
    }
  })
}



export default vueRouter;