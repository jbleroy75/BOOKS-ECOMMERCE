<template>
  <div class="home">
    <div v-if="theme !== null">
      <div class="slide" :style="{ backgroundColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16) }">
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
    this.axios.get('https://openlibrary.org/subjects/' + this.$route.params.theme + '.json?limit=20').then((res) => {
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
