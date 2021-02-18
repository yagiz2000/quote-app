import Vue from 'vue'
import App from './App.vue';
import  VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false
export const eventBus = new Vue({
  methods:{
    transferFavQuotes(favQ){
      this.$emit("favQuotes",favQ)
    },
    transerGetAdvicesMethod(method){
      this.$emit("transferredMethod",method);
    }
  }
})
new Vue({
  render: h => h(App),
}).$mount('#app')
