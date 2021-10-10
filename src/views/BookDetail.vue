<template>
  <div class="book">
    <div v-if="livre !== undefined">
      <h1>{{ livre.title }}</h1>
      <img :src="'http://covers.openlibrary.org/b/id/' + livre.covers[0] + '-M.jpg'" alt="" />
      <p>{{ livre.description }}</p>
      <p><a v-for="author in livre.authors" :key="author" href=""></a></p>
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

<style lang="scss" scoped></style>
