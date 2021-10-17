<template>
  <div class="header">
    <h1>BookSell</h1>
    <div class="link" v-if="!mobile">
      <router-link class="button" to="/">Home</router-link>
      <router-link class="button" to="/about">About</router-link>
      <router-link class="button" to="/themes">Themes</router-link>
      <span class="cart button" @click="toggleCart">
        <img src="@/assets/icon-kart.png" alt="icon-kart" width="30px" height="30px" />
        <span>{{ cart.length }}</span> Panier
      </span>
    </div>
    <div class="header-container" v-else>
      <transition name="appear">
        <div class="navigation-mobile" key="nav" v-if="menuShow">
          <div class="link">
            <router-link class="button" to="/">Home</router-link>
            <router-link class="button" to="/about">About</router-link>
            <router-link class="button" to="/themes">Themes</router-link>
            <span class="cart button" @click="toggleCart">
              <img src="@/assets/icon-kart.png" alt="icon-kart" width="30px" height="30px" />
              <span>{{ cart.length }}</span> Panier
            </span>
          </div>
        </div>
      </transition>
      <div class="hamburger" @click="toggleNavigation">
        <div class="h-line"></div>
        <div class="h-line"></div>
        <div class="h-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    cart: { type: Array, default: () => [] },
  },
  data() {
    return {
      mobile: false,
      menuShow: false,
    };
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
    quitCart() {
      this.$emit('quit-cart');
    },
    onResize() {
      this.mobile = window.innerWidth <= 600;
      if (!this.mobile && this.menuShow) this.toggleNavigation();
    },
    toggleNavigation() {
      if (!this.mobile) return;
      this.menuShow = !this.menuShow;
      this.quitCart();
      if (this.menuShow) {
        window.scrollTo(0, 0);
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else document.getElementsByTagName('body')[0].style.overflow = 'auto';
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
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
  h1 {
    font-size: 2rem;
  }
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
        color: rgb(87, 118, 200);
      }
    }
  }
  .hamburger {
    box-sizing: border-box;
    cursor: pointer;
  }

  .navigation-mobile {
    position: absolute;
    z-index: 1;
    background: rgb(247, 251, 255);
    width: 100%;
    right: 0px;
    top: 40px;
    height: calc(100vh - 38px);
    .link {
      flex-direction: column;

      .button {
        justify-content: center;
        width: 100vw;
        padding: 10px 10px;
        &:hover {
          background: rgb(42, 42, 42);
          color: white;
        }

        &.router-link-exact-active {
          color: rgb(87, 118, 200);
        }
      }
      .cart span {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% - 25px), calc(-50% - 9px));
      }
    }
  }

  .h-line {
    width: 30px;
    height: 3px;
    border-radius: 30px;
    background: #2c3e50;
    box-shadow: 0px 1px 10px rgb(82, 82, 82);
    margin: 4px;
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

.appear-enter-active,
.appear-leave-active {
  transition: 0.5s;
  overflow: hidden;
}

.appear-enter {
  opacity: 0;
}
.appear-enter-to {
  opacity: 1;
}

.appear-leave-to {
  opacity: 0;
}
.appear-leave {
  opacity: 1;
}

@media (max-width: 1080px) {
  .header {
    padding: 0 1em;
  }
}
</style>
