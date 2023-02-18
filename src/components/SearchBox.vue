<script>
import { state } from "../state";
export default {
  name: "SearchBox",
  data() {
    return {
      state,
      searchbox: [],
      tt: window.tt,
    };
  },
  methods: {
    getSearchBox() {
      this.searchbox = {
        searchOptions: {
          key: this.state.tt_key,
          language: "en-GB",
          limit: 5,
        },
        autocompleteOptions: {
          key: this.state.tt_key,
          language: "en-GB",
        },
      };

      const ttSearchBox = new this.tt.plugins.SearchBox(
        this.tt.services,
        this.searchbox
      );
      const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
      const searchBoxEl = document.getElementById("search_box");

      searchBoxEl.insertAdjacentElement("afterbegin", searchBoxHTML);

      const inputSearchBox = document.querySelector(
        "input.tt-search-box-input"
      );

      inputSearchBox.setAttribute("placeholder", "What's your destination?");
    },
  },
  mounted() {
    this.getSearchBox();
  },
};
</script>
<template>
  <div id="search_box"></div>
</template>

<style></style>
