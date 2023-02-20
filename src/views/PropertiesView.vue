<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PropertiesList from "../components/PropertiesList.vue";
import SearchBox from "../components/SearchBox.vue";
import { state } from "../state";
import axios from "axios";

export default {
  name: "PropertiesView",
  components: { AppHeader, AppFooter, PropertiesList, SearchBox },
  data() {
    return {
      state,
      apiKey: state.tt_key,
      tt: window.tt,
      radius: 20000, // raggio ricerca
      rooms: 1,
      beds: 1,
      filteredList: null,
      propertiesCoordinates: [],
      lng: "",
      lat: "",
      amenities: [],
      amenitiesList: [],
    };
  },
  methods: {
    // conversione indirizzo cercato in coordinate
    geocoding() {
      this.tt.services
        .geocode({
          key: this.apiKey,
          query: this.getSearchboxValue(),
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
          //console.log(response.data.results);
          this.properties = response.data.results;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
          this.loading = false;
        });
    },
    getAmenities(url) {
      axios
        .get(url)
        .then((response) => {
          //console.log(response);
          this.amenitiesList = response.data;
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
    /* prendi il valore della ricerca su tt */
    getSearchboxValue() {
      return document.querySelector("input.tt-search-box-input").value;
    },
    created() {
      // richiamo funzione in componente figlio (mappa + searchbox)
      this.$refs.search_box.getSearchBox();
    },
  },
  mounted() {
    this.getProperties(this.state.api_url + "/api/properties");
    this.getAmenities(this.state.api_url + "/api/amenities");
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <div class="banner search-properties p-5">
      <div class="container">
        <div class="search-bar text-center">
          <div
            class="input-group d-flex align-items-center justify-content-center bg-dark bg-opacity-75 rounded pb-5 pt-2">
            <div class="search-address d-flex flex-column">
              <label for="addressToSearch" class="text-orange text-start p-2">
                <font-awesome-icon icon="fa-solid fa-map-location-dot" />
                Place</label>
              <!-- <input
                                                                        type="text"
                                                                        placeholder="Where?"
                                                                        v-model="addressToSearch"
                                                                        class="border border-0 py-2 px-4 w-100"
                                                                        @keyup.enter="geocoding()"
                                                                      /> -->
              <SearchBox ref="search_box" @keyup.enter="geocoding" />
            </div>
            <!--/address-->
            <div class="search-numbs-rooms d-flex flex-column align-items-center">
              <label for="rooms" class="text-orange p-2 text-start"><font-awesome-icon icon="fa-solid fa-door-open" />
                Rooms</label>
              <input type="number" class="border border-0 py-2 px-4 text-center w-100" min="1" max="20" v-model="rooms" />
            </div>
            <!--/numb_rooms-->
            <div class="search-numbs-beds d-flex flex-column align-items-center">
              <label for="beds" class="text-orange p-2 text-start"><font-awesome-icon icon="fa-solid fa-bed" />
                Beds</label>
              <input type="number" class="border border-0 py-2 px-4 text-center w-100" min="1" max="20" v-model="beds" />
            </div>
            <!--/numbs_beds-->
            <div class="search-radius d-flex flex-column align-items-center">
              <label for="radius" class="text-orange text-start p-2"><font-awesome-icon icon="fa-solid fa-street-view" />
                Radius</label>
              <div name="radius" class="bg-white d-flex flex-sm-row flex-column align-items-center px-4 py-1">
                <input type="range" v-model="radius" min="0" max="100000" step="100" class="py-2" />
                <span id="km_tag" class="ps-2" style="width: 100px">
                  {{ parseFloat(radius / 1000).toFixed(1) }} Km
                </span>
              </div>
            </div>
            <!--/.radius -->
            <div class="search-amenities">
              <label for="amenities" class="text-orange text-start p-2"><font-awesome-icon
                  icon="fa-solid fa-house-user" />
                Amenities</label>
              <div name="amenities" class="d-flex flex-column bg-white px-4">
                <button class="btn btn-white px-2 dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Choose
                </button>
                <ul class="dropdown-menu dropdown-menu-end text-center border border-0">
                  <li v-for="amenity in amenitiesList">
                    <input type="checkbox" :name="amenity.name" :id="amenity.name" v-model="amenities"
                      :value="amenity.name" />
                    <span class="px-1">{{ amenity.name }}</span>
                  </li>

                </ul>
              </div>
            </div>
            -->
            <!--/.amenities-->
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredList">
      <template v-if="filteredList.length > 0">
        <section class="filtered-list pt-5">
          <div class="container">
            <div class="row row-cols-1 row-cols-md-4 g-4 mb-4">
              <div class="col" v-for="property in filteredList">
                <div class="card text-bg-dark border-0" style="height: 100%">
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
                        {{ property.square_meters }} m&sup2
                      </h6>
                    </div>
                    <h4 class="card-title">{{ property.title }}</h4>
                    <p class="card-text">{{ property.address }}</p>
                    <p class="card-text text-orange">
                      {{ property.price }} &euro;
                    </p>
                    <div class="type my-3">
                      <strong class="text-orange" v-if="property.type">
                        {{ property.type.name }}
                      </strong>
                      <span v-else></span>
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
                  <a href="#" class="page-link">{{
                    filteredList.current_page
                  }}</a>
                </li>
                <li class="page-item" v-if="filteredList.next_page_url" @click="nextPage(filteredList.next_page_url)">
                  <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </template>
      <template v-else-if="filteredList.length == 0">
        <!-- TODO -->
        <p>No results</p>
      </template>
    </div>
    <div v-else>
      <PropertiesList />
    </div>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped></style>
