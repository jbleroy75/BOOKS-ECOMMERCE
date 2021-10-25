<template>
  <div class="book">
    <h3 @click="$router.go(-1)">&lt; Go back</h3>
    <div class="book-container" v-if="livre !== undefined">
      <img
        v-if="livre.cover_id !== null"
        :src="'http://covers.openlibrary.org/b/id/' + livre.cover_id + '-M.jpg'"
        alt=""
      />
      <div class="cover-default" v-else>
        <p>{{ livre.title }}</p>
      </div>

      <div class="description-container">
        <h1>{{ livre.title }}</h1>
        <p>{{ getDescription(livre.description) }}</p>
        <p class="price">{{ $parent.formatPrice(livre.price) }}</p>
        <button class="add" v-if="!$parent.isInCart(livre)" @click="$parent.addToCart(livre)">Add to Cart</button>
        <button class="remove" v-else @click="$parent.removeFromCart(livre)">Remove from Cart</button>
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
  methods: {
    getDescription(description) {
      if (description == undefined) return '';
      if (description.value !== undefined) description = description.value;
      if (typeof description === 'string') {
        return description.split('----------')[0].split('Contains:')[0];
      }
      return description;
    },
  },
  mounted() {
    this.axios.get('https://openlibrary.org/works/' + this.$route.params.id + '.json').then((res) => {
      this.livre = res.data;
      this.$parent.setPrice(this.livre);
      if (this.livre.covers === undefined) this.livre.cover_id = null;
      else this.livre.cover_id = this.livre.covers[0];
    });
  },
};
</script>

<style lang="scss" scoped>
.book h3 {
  text-align: left;
  margin: 15px 20vw;
  cursor: pointer;
  user-select: none;
  color: #3a8895;
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

  color: black;
  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.84);
  }
  &.add {
    background: rgb(205, 225, 251);
  }
  &.remove {
    background: rgb(251, 207, 205);
  }
}

.book-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
  img {
    height: 360px;
    width: 280px;
    margin: 0 70px 0 0;
  }
  .cover-default {
    display: flex;
    justify-content: center;
    align-items: center;
    background: whitesmoke;
    color: black;
    height: 360px;
    width: 280px;
    margin: 0 70px 0 0;
  }
  .price {
    font-weight: bold;
    font-size: 20px;
  }
  .description-container {
    text-align: left;
    p {
      margin-top: 20px;
      max-width: 40vw;
    }
  }
}
@media (max-width: 560px) {
  .book-container {
    flex-direction: column-reverse;
    img {
      height: 260px;
      width: 180px;
      margin: 20px 0;
      border: solid black 2px;
    }
    .description-container {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      p {
        margin-top: 20px;
        max-width: none;
        padding: 0 20px;
      }
    }
  }
}
</style>
