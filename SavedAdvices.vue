<template>
  <div>
    <div v-if="quotes.length > 0">
      <h4 class="quotes-title">Your Favourite Quotes</h4>
      <div v-for="(q, index) in quotes" :key="index" class="container mt-5">
        <div class="card my-3">
          <div class="card-body">
            <h5 class="card-title">{{ q.author }}</h5>
            <p ref="text" class="card-text">{{ q.quote }}</p>
            <a
              @click="confirmAlert(index)"
              id="remove"
              class="btn btn-danger"
              >Remove</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import Vue from "vue";
 */ import { eventBus } from "../main";

export default {
  data() {
    return {
      quotes: [],
    };
  },
  methods: {
    confirmAlert(index) {
      this.$confirm(
        "Are you sure, you are about the removing the quote.",
        "Removing",
        "question"
      )
        .then(() => {
          this.removeQuoteFromStorage(index)
        })
        .catch(() => {
          console.log("OK not selected.");
        });
    },
    simpleAlert() {
      this.$alert(
        "This is simple but cool alert with icon.",
        "Success",
        "success"
      ).then(() => console.log("Closed"));
    },
    removeQuoteFromStorage(index) {
      let newQuotes = this.quotes;
      newQuotes.splice(index, 1);
      localStorage.setItem("quotes", JSON.stringify(newQuotes));
    },
  },
  beforeCreate() {
    eventBus.$on("favQuotes", (favQ) => {
      this.quotes = favQ;
    });
  },
};
</script>

<style>
.quotes-title {
  text-align: center;
  margin-top: 20px;
}
.card {
  margin-top: 10px;
  border-radius: 20px;
}

.card-body {
  background-color: #615d6c !important;
  border-radius: 20px;
  color: white;
}
#remove {
  color: white;
}

.card-title {
  background-color: #615d6c !important;
}
.card-text {
  background-color: #615d6c !important;
  color: white;
}
#title {
  text-align: center;
}
.form-control {
  border-radius: 20px;
}
</style>
