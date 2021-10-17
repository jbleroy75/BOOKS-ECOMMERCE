<template>
  <div class="cart">
    <div class="panier" v-if="cart.length !== 0">
      <table>
        <thead>
          <tr>
            <th colspan="5"><h2>Mon Panier</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in cart" :key="element.key">
            <td>
              <p class="remove-from-kart" @click="$parent.removeFromCart(element.product)">❌</p>
              <img :src="'http://covers.openlibrary.org/b/id/' + element.product.cover_id + '-M.jpg'" />
            </td>
            <td>
              <h2>{{ element.product.title }}</h2>
            </td>
            <td>
              <p>{{ $parent.formatPrice(element.product.price) }}</p>
            </td>
            <td><input type="number" v-model.number="element.amount" min="1" /></td>
            <td class="total">
              <p>{{ $parent.formatPrice(element.product.price * element.amount) }}</p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="last-line">
            <td colspan="3"></td>
            <td>Prix total:</td>
            <td>{{ $parent.formatPrice(totalPrice()) }}</td>
          </tr>
        </tfoot>
      </table>
      <button @click="payer()">Payer</button>
    </div>
    <div id="empty-cart" v-else>
      <h2>Votre panier est vide</h2>
    </div>
    <Message v-if="message" @valide="message = !message">Merci pour votre achat !</Message>
  </div>
</template>

<script>
import Message from '@/components/Message.vue';

export default {
  name: 'cart',
  components: {
    Message,
  },
  props: {
    cart: { type: Array, default: () => [] },
  },
  data() {
    return {
      message: false,
    };
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
    totalPrice() {
      let price = 0;
      for (const element of this.cart) {
        if (!isNaN(element.amount) && element.amount > 0) {
          price += element.product.price * element.amount;
        }
      }
      return price;
    },
    payer() {
      this.message = true;
      this.$parent.clearCart();
    },
    updateItemPanier(item) {
      if (item.amount !== '' && item.amount > 0) {
        item.amount = item.input;
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
  background: rgb(205, 225, 251);
  color: black;
}
button:hover {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.84);
}
table {
  margin: 3em auto 0 auto;
  padding: 0 1em;
  border-collapse: collapse;
  background: #e1e6eb;
  background: rgb(237, 240, 243);
  background: linear-gradient(0deg, rgb(215, 218, 221) 0%, rgb(240, 242, 245) 71%);
  border-radius: 5px;
  thead th {
    padding-bottom: 3em;
  }
  tbody {
    tr:first-child td:last-child {
      border-radius: 5px 5px 0 0;
    }
    tr td:first-child {
      position: relative;
    }
  }
  .total {
    background: #dde5e9;
    p {
      text-align: right;
      padding: 15px;
      border-left: solid 1px rgb(180, 180, 180);
    }
  }
  input {
    max-height: 18px;
  }
  img {
    height: 120px;
    width: 85px;
    border-radius: 5px;
  }
  td {
    padding: 0 10px;
    input {
      max-width: 40px;
      font-size: 15px;
      border: none;
      border-radius: 5px;
      padding: 4px 3px;
      transform: scale(1.2);
    }
    p {
      text-align: justify;
      max-width: 300px;
    }
  }
  .last-line {
    td:last-child {
      background: #6f7b81;
      border-radius: 0 0 5px 0;
      font-size: 20px;
      color: #edf0f3;
      text-align: right;
    }
    td:nth-child(2) {
      background: #6f7b81;
      border-radius: 5px 0 0 5px;
      font-size: 17px;
      font-weight: bold;
      color: #dde5e9;
    }
  }
}
.remove-from-kart {
  position: absolute;
  top: -5px;
  left: 4px;
  padding: 1px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  background: #ebf0f3;
  border-radius: 50%;
  box-shadow: 0px 1px 3px black;
  user-select: none;
}
#empty-cart {
  margin-top: 100px;
}

@media (max-width: 1080px) {
  table h2 {
    font-size: 12px !important;
  }
  table p {
    font-size: 10px !important;
  }
  table .total p {
    font-size: 15px !important;
    text-align: center !important;
  }
  table td img {
    width: 50px !important;
    height: 50px !important;
  }
  table .last-line td {
    font-size: 15px !important;
    text-align: center !important;
  }
  table td h2 {
    padding: auto !important;
  }
  .remove-from-kart {
    top: 0px !important;
    left: 0px !important;
  }
}
</style>
