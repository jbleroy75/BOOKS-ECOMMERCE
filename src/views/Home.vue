<template>
  <div class="home">
    <div class="slider">
      <div class="slide" v-for="(slide, index) in slides" :key="slide.image">
        <div v-show="index + 1 === currentSlideId">
          <h1>
            <pre>{{ slide.title }}</pre>
          </h1>
          <img :src="slide.img" :alt="slide.title" />
        </div>
      </div>

      <p id="arrow-left" class="arrow" @click="previousSlide()">&lt;</p>
      <p id="arrow-right" class="arrow" @click="nextSlide()">&gt;</p>
    </div>

    <h2 class="themes-title">Nos themes <span @click="seeThemes()">Voir plus..</span></h2>
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

    <h2 class="themes-title">Nos recommandations</h2>
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
        <p>{{ livre.price }}€</p>
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
          img: '',
        },
        {
          title: 'Comme\nune envie de découvrir',
          img: '',
        },
      ],
    };
  },
  created() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].img = this.getSliderImgUrl(i + 1);
    }

    this.axios.get('https://openlibrary.org/subjects/mystery_and_detective_stories.json?limit=20').then((res) => {
      this.livres = res.data.works;
      for (let i = 0; i < this.livres.length; i++) this.$parent.setPrice(this.livres[i]);
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
    seeThemes() {
      this.$router.push('/themes');
      window.scrollTo(0, 0);
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
    color: white;
    border-radius: 6px;
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
  width: 43px;
  height: 43px;
  background: white;
  text-align: center;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
  filter: drop-shadow(0px 4px 19px rgba(0, 0, 0, 0.25));
  top: 50%;
  transform: translate(0, -50%);
  user-select: none;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.25);
  border-radius: 6px;

  &:hover {
    transform: translate(0, -50%) scale(1.05);
  }
  &#arrow-left {
    left: 120px;
  }
  &#arrow-right {
    right: 120px;
  }
}

.slider {
  margin-top: 30px;
  position: relative;
  border-radius: 7px;
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
      width: 79vw;
    }
  }
}

.banniere-img > img {
  border-radius: 7px;
}

.themes-title {
  text-align: left;
  margin: 30px 10vw 30px 10vw;
  border-bottom: 2px solid black;
  span {
    font-size: 16px;
    color: rgb(58, 136, 149);
    cursor: pointer;
    user-select: none;
  }
}

.books {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10vw;
  .book {
    position: relative;
    height: 260px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 5px;
    cursor: pointer;
    transition: 0.4s;

    p {
      position: absolute;
      top: -10px;
      right: -5px;
      width: 50px;
      height: 50px;
      font-family: Roboto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      background: white;
      opacity: 0;
      transition: 0.4s;
    }

    &:hover {
      transform: scale(1.05);
      p {
        opacity: 1;
      }
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

@media (max-width: 700px) {
  .arrow {
    width: 35px;
    height: 35px;
  }
}

.title-book {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: #000000;
  margin-top: -100px;
}

.author-book {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #a4a4a4;
}

.note-book {
  background: #ffc41f;
}

.info-book {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #a4a4a4;
}
</style>
