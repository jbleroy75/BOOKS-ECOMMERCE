<template>
  <div class="home">
    <div class="slider">
      <img src="@/assets/slide_1.png" alt="slide_1" />

      <p id="arrow-left" class="arrow">&lt;</p>
      <p id="arrow-right" class="arrow">&gt;</p>
    </div>
    <div class="books">
      <div class="book" v-for="livre in livres" :key="livre.key">
        <img :src="'http://covers.openlibrary.org/b/id/' + livre.cover_id + '-M.jpg'" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      livres: [],
    };
  },
  created() {
    this.axios
      .get(
        'https://openlibrary.org/subjects/mystery_and_detective_stories.json?limit=20',
        //'https://openlibrary.org/search.json?q=has_fulltext:true AND first_publish_year:[2015 TO 2021]&offset=0&limit=40&sort=random_2021-10-08T13&fields=key,title,author_name,cover_i,ddc,lcc,lending_edition_s,first_publish_year,edition_count',
      )
      .then((res) => {
        this.livres = res.data.works;
      });
  },
};
</script>

<style lang="scss" scoped>
.arrow {
  position: absolute;
  width: 63px;
  height: 63px;
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
  &#arrow-left {
    left: 0;
  }
  &#arrow-right {
    right: 0;
  }
}

.slider img {
  max-height: 80vh;
  width: 80vw;
}

.slider {
  position: relative;
  margin-bottom: 40px;
}

.books {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .book {
    height: 260px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 5px;
  }

  img {
    height: 260px;
    min-width: 100%;
  }
}
</style>
