import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import cartModule from '@/modules/cartModule';

const store = new Vuex.Store({
  modules: {
    cartModule
  }
})

export default store;
