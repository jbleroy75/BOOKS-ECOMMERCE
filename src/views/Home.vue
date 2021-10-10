<template>
  <div class="home">
    <div class="slider">
      <div class="slide" v-for="(slide, index) in slides" :key="slide.image">
        <div v-if="index + 1 === currentSlideId">
          <h1>
            <pre>{{ slide.title }}</pre>
          </h1>
          <img :src="getSliderImgUrl(currentSlideId)" :alt="slide.title" />
        </div>
      </div>

      <p id="arrow-left" class="arrow" @click="previousSlide()">&lt;</p>
      <p id="arrow-right" class="arrow" @click="nextSlide()">&gt;</p>
    </div>

    <h2>Nos themes</h2>
    <div class="themes">
      <div
        class="theme"
        v-for="theme in themes"
        :key="theme.key"
        @click="$router.push('/theme/' + theme.key)"
        :style="{ backgroundColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16) }"
      >
        <p>{{ theme.title }}</p>
      </div>
    </div>

    <h2>Nos recommandations</h2>

    <div class="books">
      <div
        class="book"
        v-for="livre in livres"
        :key="livre.key"
        @click="$router.push('/book/' + livre.key.replace('/works/', ''))"
      >
        <img
          v-if="livre.cover_id !== null"
          :src="'http://covers.openlibrary.org/b/id/' + livre.cover_id + '-M.jpg'"
          alt=""
        />
        <div class="cover-default" v-else>
          <p>{{ livre.title }}</p>
        </div>
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
      currentSlideId: 1,
      slideLimit: 2,
      livres: [],
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
  created() {
    this.axios.get('https://openlibrary.org/subjects/mystery_and_detective_stories.json?limit=20').then((res) => {
      this.livres = res.data.works;
    });
  },
  methods: {
    getSliderImgUrl(id) {
      return require('@/assets/slider/slide_' + id + '.png');
    },
    nextSlide() {
      if (this.currentSlideId + 1 > this.slideLimit) this.currentSlideId = 1;
      else this.currentSlideId++;
    },
    previousSlide() {
      if (this.currentSlideId - 1 < 1) this.currentSlideId = this.slideLimit;
      else this.currentSlideId--;
    },
  },
};
</script>

<style lang="scss" scoped>
.themes {
  display: flex;
  align-items: center;
  margin: 0 10vw;
  overflow-x: scroll;
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
    margin: 0 5px;
    transition: 0.4s;
    cursor: pointer;
    p {
      user-select: none;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}

.arrow {
  position: absolute;
  width: 50px;
  height: 50px;
  background: white;
  text-align: center;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-weight: bold;
  font-size: 25px;
  filter: drop-shadow(0px 4px 19px rgba(0, 0, 0, 0.25));
  top: 50%;
  transform: translate(0, -50%);
  user-select: none;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: translate(0, -50%) scale(1.05);
  }
  &#arrow-left {
    left: 30px;
  }
  &#arrow-right {
    right: 30px;
  }
}

.slider {
  position: relative;
  .slide {
    position: relative;
    h1 {
      position: absolute;
      top: 50%;
      left: 15%;
      text-align: left;
      transform: translate(0, -50%);
      color: black;
      font-size: 5vw;
      pre {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
    }
    img {
      max-height: 80vh;
      width: 80vw;
    }
  }
}

h2 {
  text-align: left;
  margin: 30px 10vw 30px 10vw;
  border-bottom: 2px solid white;
}

.books {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10vw;
  .book {
    height: 260px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 5px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
      transform: scale(1.05);
    }

    .cover-default {
      display: flex;
      justify-content: center;
      align-items: center;
      background: whitesmoke;
      color: black;
      width: 100%;
      height: 100%;
    }
  }

  img {
    height: 260px;
    min-width: 100%;
  }
}
</style>
