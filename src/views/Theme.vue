<template>
  <div class="home">
    <div v-if="theme !== null">
      <div
        class="slide"
        :style="{
          backgroundColor:
            'hsl(' + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (80 + 10 * Math.random()) + '%)',
        }"
      >
        <h1>{{ theme.name }} ({{ theme.ebook_count }} results)</h1>
      </div>

      <div class="books">
        <div
          class="book"
          v-for="livre in theme.works"
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

      <button @click="addThemes()">Afficher plus</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  data() {
    return {
      theme: null,
    };
  },
  mounted() {
    this.axios.get('https://openlibrary.org/subjects/' + this.$route.params.theme + '.json?limit=30').then((res) => {
      this.theme = res.data;
    });
  },
  methods: {
    addThemes() {
      this.axios
        .get(
          'https://openlibrary.org/subjects/' +
            this.$route.params.theme +
            '.json?limit=20&offset=' +
            this.theme.works.length,
        )
        .then((res) => {
          this.theme.works = this.theme.works.concat(res.data.works);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: 'Sansita Swashed', cursive;
  transition: 0.2s;
  font-size: 20px;
  margin: 30px 0 40px 0;
  cursor: pointer;
  height: 35px;
  width: 200px;
  border-radius: 5px;
  border: solid rgb(0, 0, 0) 2px;
  color: black;
  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.84);
  }
}

.slide {
  margin: 15px 10vw;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: center;
  h1 {
    text-align: center;
  }
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
