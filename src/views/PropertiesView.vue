<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PropertiesList from "../components/PropertiesList.vue";
import { state } from "../state";
import axios from "axios";

export default {
  name: "PropertiesView",
  components: { AppHeader, AppFooter, PropertiesList },
  data() {
    return {
      state,
      apiKey: "BNYqu6i8McfAozT5DuF9E7cCsyItsHYt",
      tt: window.tt,
      addressToSearch: "",
      radius: 20000, // raggio ricerca
      rooms: 1,
      beds: 1,
      filteredList: [],
      propertiesCoordinates: [],
      lng: "",
      lat: "",
    };
  },
  methods: {
    // conversione indirizzo cercato in coordinate
    geocoding() {
      this.tt.services
        .geocode({
          key: this.apiKey,
          query: this.addressToSearch,
          bestResult: true,
          language: "it-IT",
        })
        .then((res) => {
          console.log(res);
          this.lng = res.position.lng;
          this.lat = res.position.lat;
          this.getFilteredList();
        });
    },
    getFilteredList() {
      axios
        .get(
          this.state.api_url +
          `/api/properties/filteredsearch/lng=${this.lng}/lat=${this.lat}/radius=${this.radius}/rooms=${this.rooms}/beds=${this.beds}/amenities=${this.amenities}`
        )
        .then((res) => {
          console.log(res);
          this.filteredList = res.data;

          // svuoto array coordinate degli appartamenti trovati
          this.apartmentsCoordinates = [];

          console.log(this.filteredList);
        })
        .catch((err) => console.error(err));
    },
    getProperties(url) {
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.results);
          this.properties = response.data.results;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
          this.loading = false;
        });
    },
    getImagePath(path) {
      if (path) {
        return this.state.api_url + "/storage/" + path;
      }
      return "/images/placeholder.png";
    },
    prevPage(url) {
      console.log(url);
      this.getFilteredList(url);
    },
    nextPage(url) {
      console.log(url);
      this.getFilteredList(url);
    },
  },
  mounted() {
    this.getProperties(this.state.api_url + "/api/properties");
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <div class="banner search-properties p-5">
      <div class="container p-5">
        <div class="search-bar text-center py-5">
          <div class="d-flex flex-column">
            <!-- ricerca indirizzo -->
            <input type="text" placeholder="Dove vuoi andare?" v-model="addressToSearch"
              class="w-100 mb-3 rounded-pill px-2 px-2" @keyup.enter="geocoding()" />
            <div class="d-flex align-items-center justify-content-around py-1">
              <!-- filtro numero minimo stanze -->
              <span class="d-flex align-items-center">
                <label for="rooms">N. stanze</label>
                <input type="number" class="rounded-pill px-2" min="1" max="8" v-model="rooms" />
              </span>
              <!-- filtro numero minimo letti -->
              <span class="d-flex align-items-center">
                <label for="beds">N. letti</label>
                <input type="number" class="rounded-pill px-2" min="1" max="8" v-model="beds" />
              </span>
              <!-- filtro raggio di ricerca -->
              <span class="d-flex align-items-center">
                <label for="radius">Raggio di Ricerca</label>
                <input type="range" v-model="radius" min="0" max="100000" step="100" />
                <span id="km_tag">
                  {{ parseFloat(radius / 1000).toFixed(1) }} Km
                </span>
              </span>

              <span class="d-flex align-items-center">
                <label for="amenities">amenities</label>
                <div name="amenities">
                  <input type="checkbox" name="" id="">
                  <span>iron</span>
                  <input type="checkbox" name="" id="">
                  <span>tv</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="filteredList.length > 0">
      <div class="row row-cols-1 row-cols-md-4 g-4 mb-4">
        <div class="col" v-for="property in filteredList">
          <div class="card border-0" style="height: 100%">
            <div class="image overflow-hidden rounded">
              <router-link :to="{
                name: 'single-property',
                params: { slug: property.slug },
              }">
                <img class="img-fluid photo-zoom card-image" :src="getImagePath(property.image)" alt="" />
              </router-link>
            </div>
            <div class="card-body">
              <div class="icons d-flex justify-content-between mb-3">
                <h6 class="text-orange">
                  <font-awesome-icon icon="fa-solid fa-door-open" />
                  {{ property.rooms_num }}
                </h6>
                <h6 class="text-orange">
                  <font-awesome-icon icon="fa-solid fa-bed" />
                  {{ property.beds_num }}
                </h6>
                <h6 class="text-orange">
                  {{ property.square_meters }} &#13217;
                </h6>
              </div>
              <h4 class="card-title">{{ property.title }}</h4>
              <p class="card-text">{{ property.address }}</p>
              <p class="card-text text-orange">{{ property.price }} &euro;</p>
              <div class="type my-3">
                <strong class="text-orange" v-if="property.type">
                  {{ property.type.name }}
                </strong>
                <span v-else>no types yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="d-flex justify-content-center pt-5" aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" v-if="filteredList.prev_page_url" @click="prevPage(filteredList.prev_page_url)">
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item active" aria-current="page">
            <a href="#" class="page-link">{{ filteredList.current_page }}</a>
          </li>
          <li class="page-item" v-if="filteredList.next_page_url" @click="nextPage(filteredList.next_page_url)">
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </template>
    <PropertiesList v-else></PropertiesList>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>
