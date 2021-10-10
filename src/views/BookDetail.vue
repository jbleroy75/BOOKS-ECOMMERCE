<template>
  <div class="book">
    <div class="book-container" v-if="livre !== undefined">
      <img :src="'http://covers.openlibrary.org/b/id/' + livre.covers[0] + '-M.jpg'" alt="" />
      <div class="description-container">
        <h1>{{ livre.title }}</h1>
        <p>{{ livre.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  data() {
    return {
      livre: undefined,
    };
  },
  mounted() {
    this.axios.get('https://openlibrary.org/works/' + this.$route.params.id + '.json').then((res) => {
      this.livre = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.book-container {
  display: flex;
  justify-content: center;
  img {
    height: 360px;
    width: 280px;
    margin: 0 70px 0 0;
  }

  .description-container {
    text-align: left;
    p {
      margin-top: 20px;
      max-width: 40vw;
    }
  }
}
</style>
