<template>
  <div class="home">
    <h2>Nos themes</h2>
    <div class="themes">
      <div
        class="theme"
        v-for="theme in themes"
        :key="theme.key"
        @click="$router.push('/theme/' + theme.key)"
        :style="{
          backgroundColor:
            'hsl(' + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (80 + 10 * Math.random()) + '%)',
        }"
      >
        <p>{{ theme.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import themesJson from '@/assets/theme.json';

export default {
  name: 'Home',
  data() {
    return {
      themes: themesJson,
      slides: [
        {
          title: 'Comme\nune envie de lire',
        },
        {
          title: 'Comme\nune envie de découvrir',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.themes {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 10vw;
  padding: 10px 0;
  .theme {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    height: 80px;
    background: white;
    color: black;
    border-radius: 15px;
    margin: 15px 5px;
    transition: 0.4s;
    cursor: pointer;
    padding: 0 5px;
    p {
      user-select: none;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}

h2 {
  text-align: left;
  margin: 30px 10vw 30px 10vw;
  border-bottom: 2px solid black;
}
</style>
