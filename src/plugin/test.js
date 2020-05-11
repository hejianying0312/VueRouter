let a = {
  install(vue){
    vue.mixin({
      data(){
        return {
          test:1
        }
      },
      methods:{
         name(params) {
          console.log(params);
        }
      }
    })
  }
}

module.exports=a;