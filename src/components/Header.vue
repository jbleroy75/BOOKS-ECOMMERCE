<template>
  <div class="header">
    <h1>BookSell</h1>
    <div class="link">
      <router-link class="button" to="/">Home</router-link>
      <router-link class="button" to="/about">About</router-link>
      <span class="cart button" @click="toggleCart">
        <img src="@/assets/icon-kart.png" alt="icon-kart" width="30px" height="30px" />
        <span>{{ cart.length }}</span> Panier
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    cart: { type: Array, default: () => [] },
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
  position: sticky;
  top: 0;
  z-index: 20;
  background: white;
  box-shadow: -1px 0px 10px rgb(197, 197, 197);

  .link {
    display: flex;
    align-items: center;
    .button {
      display: flex;
      align-items: center;
      height: 40px;
      font-weight: bold;
      color: black;
      text-decoration: none;
      padding: 0 10px;
      &:hover {
        background: gray;
      }

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .cart {
    display: flex;
    align-items: center;
    position: relative;
    user-select: none;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      background-color: #e4e4e4;
      color: #263238;
      border-radius: 100%;
      min-width: 18px;
      min-height: 18px;
      font-size: 11px;
      font-weight: 800;
      top: 1px;
      left: 19px;
    }

    & > * {
      margin: 0 5px 0 0;
    }
  }
}
</style>
