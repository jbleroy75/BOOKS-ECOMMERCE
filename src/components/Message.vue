<template>
  <div class="message">
    <div class="message-container">
      <h1><slot /></h1>
      <button @click="valide">ok</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  methods: {
    valide() {
      this.$emit('valide');
    },
  },
};
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.596);
  &-container {
    border-radius: 5px;
    padding: 20px;
    background: white;
    color: black;
  }
}
button {
  font-family: 'Sansita Swashed', cursive;
  transition: 0.2s;
  font-size: 20px;
  margin: 30px 0 10px 0;
  cursor: pointer;
  height: 35px;
  width: 200px;
  border-radius: 5px;
  border: solid rgb(0, 0, 0) 2px;
  background: rgb(47, 179, 255);
  background: linear-gradient(90deg, rgba(47, 179, 255, 1) 0%, rgba(151, 196, 222, 1) 100%);
}
button:hover {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.84);
}
</style>
