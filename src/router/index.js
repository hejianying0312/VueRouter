import Vue from 'vue'
// import Router from 'vue-router'
import Router from '../myrouter'
import HelloWorld from '../components/HelloWorld';
import test from '../components/test';

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: test
    }
  ]
})
