<script lang="ts">
import AppFooter from "../components/AppFooter.vue";
import { state } from "../state";
import axios from "axios";

export default {
  name: "HomeView",
  components: { AppFooter },
  data() {
    return {
      state,
      properties: "",
      search: "",
      filtered: [],
      autocompleteList: [],
    };
  },
  methods: {
    getProperties(url) {
      axios.get(url).then((response) => {
        console.log(response.data);
      });
    },
    getSearch() {
      this.$router.push({
        name: "advancedsearch",
        params: {
          query: this.search,
        },
      });
      // axios.get('/api/apartments/search',{
      //     params: {
      //         location: this.search
      //     }
      // }).then((response) => {
      //     console.log(response.data)
      //     this.poiList = response.data.poiList
      //     this.geometryList = response.data.geometryList
      //     this.filtered = response.data.filtered
      // });
    },
    //Completamento automatico
    autocomplete() {
      if (this.search.length >= 4) {
        if (this.search.length % 2 == 0) {
          axios
            .get(`https://api.tomtom.com/search/2/search/${this.search}.json`, {
              params: {
                key: "dcEQtI4NS1isWSGpD7hptIGNCBFbNbcC",
                typeahead: true,
                limit: 3,
              },
            })
            .then((response) => {
              console.log(response.data.results);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    completer(index) {
      this.search = this.autocompleteList[index];
      this.getSearch();
    },
  },
  mounted() {
    this.getProperties(this.state.api_url + "/api/properties");
    this.state.getSearchboxandMap();
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="parallax_group hero-container">
      <div class="parallax_layer header">
        <nav class="navbar bg-transparent shadow-none navbar-expand-md px-4">
          <div class="container">
            <router-link
              class="navbar-brand d-flex align-items-center"
              :to="{ name: 'home' }"
              aria-current="page"
            >
              <img
                class="img-fluid logo"
                style="height: 77px"
                src="/images/logo_nav.png"
                alt=""
              />
            </router-link>
            <button
              class="navbar-toggler d-md-none p-2 border border-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="toggler-icon text-white"
                ><font-awesome-icon icon="fa-solid fa-bars"
              /></span>
            </button>
            <div
              class="collapse navbar-collapse flex-md-grow-0"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav m-auto">
                <li class="nav-item pe-3">
                  <a href="#search" class="nav-link">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </a>
                </li>
                <li class="nav-item pe-3">
                  <router-link
                    active-class="active"
                    class="nav-link"
                    :to="{ name: 'properties' }"
                    >ALL PROPERTIES</router-link
                  >
                </li>
                <li class="nav-item pe-3">
                  <router-link
                    active-class="active"
                    class="nav-link"
                    :to="{ name: 'about' }"
                    >ABOUT US</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!--/.header-->
      <div class="parallax_layer sky"></div>
      <div class="parallax_layer text text-center">
        <h2 class="text-white">CHOOSE YOUR</h2>
        <h1 class="text-white">NEXT DESTINATION</h1>
      </div>
      <div class="parallax_layer city"></div>
      <div class="parallax_layer scroll-down text-white">
        <font-awesome-icon icon="fa-solid fa-angles-down" size="3x" />
      </div>
    </div>
    <div class="parallax_group info-container">
      <div class="container">
        <div class="best-properties py-5 text-center">
          <h2 class="mb-3">PROPERTIES TO LOVE</h2>
          <h2 class="m-5">insert row-cols-3 property with sponsorship</h2>
          <router-link
            active-class="active"
            class="btn bck-orange rounded-pill px-3"
            :to="{ name: 'properties' }"
            >VIEW ALL PROPERTIES</router-link
          >
        </div>
        <div class="search py-5">
          <div class="row row-cols-md-2">
            <div id="map"></div>
          </div>
          <a name="search"></a>
        </div>
        <div class="yellow-jumbo">
          <div class="search-bar">
            <div class="prova">
              <input
                class="search-input"
                type="text"
                v-model="search"
                placeholder="Dove vuoi andare?"
                @keyup="autocomplete"
                @keyup.enter="getSearch"
              />
              <div class="autocomplete-bar" v-if="autocompleteList">
                <ul>
                  <li
                    v-for="(hint, index) in autocompleteList"
                    :key="index"
                    @click="completer(index)"
                  >
                    {{ hint }}
                  </li>
                </ul>
              </div>

              <a @click="getSearch">
                <img
                  class="img-search"
                  src="http://127.0.0.1:8000/storage/icons/normal/search.svg"
                  alt="Search icon"
                />
              </a>
            </div>
          </div>
        </div>
        <AppFooter></AppFooter>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 400px;
}
</style>
