<template>
  <div id="app">
    <Header :cart="cart" @toggle-cart="toggleCart" @quit-cart="quitCart" />

    <div v-if="isCartDisplay" id="cart-background" @click="toggleCart"></div>
    <transition name="cart-transition">
      <Cart v-if="isCartDisplay" :cart="cart" id="cart" @toggle-cart="toggleCart" />
    </transition>

    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Cart from '@/components/Cart.vue';
const numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export default {
  name: 'App',
  components: {
    Header,
    Cart,
  },
  data() {
    return {
      cart: [],
      isCartDisplay: false,
    };
  },
  methods: {
    formatPrice(number) {
      return numberFormat.format(number);
    },
    addToCart(product) {
      let article = {
        product,
        amount: 1,
      };
      this.cart.push(article);
    },
    clearCart() {
      this.cart = [];
    },
    removeFromCart(article) {
      const index = this.cart.findIndex((a) => a.product.key === article.key);
      if (index !== -1) this.cart.splice(index, 1);
    },
    toggleCart() {
      this.isCartDisplay = !this.isCartDisplay;
    },
    quitCart() {
      this.isCartDisplay = false;
    },
    setPrice(element) {
      element.price = 6 + (element.title.length % 5) + ((0.1 * element.title.length) % 8);
      element.price = Math.round((element.price + Number.EPSILON) * 100) / 100;
    },
    isInCart(element) {
      const index = this.cart.findIndex((a) => a.product.key === element.key);
      return index !== -1;
    },
  },
};
</script>

<style lang="scss" scoped>
#cart-background {
  background: rgba(0, 0, 0, 0.404);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 10;
}
#cart {
  position: fixed;
  right: 0;
  z-index: 9999;
  background: whitesmoke;
  width: 40vw;
  min-width: 510px;
  height: 100%;
}

.cart-transition-enter-active,
.cart-transition-leave-active {
  transition: 0.5s;
}
.cart-transition-enter {
  transform: translateX(100%);
}
.cart-transition-leave-to {
  transform: translateX(100%);
}

@media (max-width: 1080px) {
  #cart {
    width: 100vw;
    min-width: auto;
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
