<template>
  <div class="container">
    <h1 id="title">BEST QUOTES</h1>

    <div class="row">
      <div class="col col-sm d-flex justify-content-center mt-3">
        <div class="box">
          <div class="advice">
            <p id="advice">
              {{ quote }}
              <span class="badge badge-secondary">{{ author }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="button d-flex justify-content-center mt-3">
      <button type="button" @click="saveAdviceToLocalStorage" class="btn mx-2">
        Save Advice
      </button>
      <button type="button" @click="fetchProcess" class="btn mx-2">
        New Advice
      </button>
    </div>
  </div>
</template>

<script>
let url = "https://favqs.com/api/qotd";
import { eventBus } from "../main";

export default {
  data() {
    return {
      advices: [],
      quote: "",
      author: "",
    };
  },
  methods: {
    simpleAlert(type,data) {
      let firstLetterUpperCase = type.charAt(0).toUpperCase() + type.slice(1)
      this.$alert(
        `${data}`,
        `${firstLetterUpperCase}`,
        `${type}`
      ).then(() => console.log("Closed"));
    },
    fetchProcess() {
      fetch(url)
        .then((data) => data.json())
        .then((res) => {
          this.quote = res.quote.body;
          this.author = res.quote.author;
        })
        .catch((err) => err);
    },
    duplicationCheck() {
      let quotes = this.getAdvicesFromLocalStorage();
      for (let index = 0; index < quotes.length; index++) {
        const element = quotes[index];
        if (element.quote === this.quote) {
          return true;
        }
      }
      return false;
    },
    saveAdviceToLocalStorage() {
      let quotes = this.getAdvicesFromLocalStorage();
      let newQuoute = {
        quote: this.quote,
        author: this.author,
      };
      console.log(this.duplicationCheck());
      if (
        this.duplicationCheck() === false &&
        this.quote !== "" &&
        this.author !== ""
      ) {
        quotes.push(newQuoute);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        eventBus.transferFavQuotes(quotes);
        this.simpleAlert("success","Saved succesfully");
      }
      else{
        this.simpleAlert("warning","This quote saved aldready");
      }
    },

    getAdvicesFromLocalStorage() {
      let quotes;
      if (localStorage.getItem("quotes") === null) {
        quotes = [];
      } else {
        quotes = JSON.parse(localStorage.getItem("quotes"));
      }
      return quotes;
    },
  },
  mounted() {
    this.fetchProcess();
    let quotes = this.getAdvicesFromLocalStorage();
    eventBus.transferFavQuotes(quotes);
  },
};
</script>

<style>
.box {
  width: 500px;
  height: 400px;
  background-color: #8182ef;
  border: 3px solid #8182ef;
  border-radius: 25px;
  transition: 1000ms;
  padding: 15px;
}
.box:hover {
  box-shadow: 10px 10px;
  transition: box-shadow 1000ms;
}
.advice {
  background-color: #8182ef;
}
#advice {
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  background-color: #8182ef;
  text-align: center;
  margin-top: 20%;
  color: azure;
}
.btn {
  border-radius: 20px;
  border: 3px solid #6f8ab7;
  transition: background-color 400ms linear;
}
.btn.mx-2:hover {
  background-color: #6f8ab7;
  transition: background-color 400ms linear;
}
</style>
