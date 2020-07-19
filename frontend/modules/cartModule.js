
const updateLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
const getParsedFromLocalStorage = key => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value)
  } catch {
    return null 
  }
}

export default {
  namespaced: true,
  state: {
    inventory: getParsedFromLocalStorage('inventory') || [],
  },
  getters: {
    inventory: state => {
      return state.inventory;
    }
  },
  mutations: {
    ADD_ITEM_TO_CART: (state, item) => {
      state.inventory.push(item);

      updateLocalStorage('inventory', state.inventory)
    },
    REMOVE_ITEM_FROM_CART: (state, item) => {
      state.inventory = state.inventory.filter(i => i !== item)

      updateLocalStorage('inventory', state.inventory)
    }
  },
  actions: {
    addItemToCart({ commit }, item) {
      commit("ADD_ITEM_TO_CART", item);
    },
    removeItemFromCart({ commit }, item) {
      commit('REMOVE_ITEM_FROM_CART', item)
    }
  }
};
