<script>
import AppFooter from "../components/AppFooter.vue";
import SearchInMap from "../components/SearchInMap.vue";
import SearchBox from "../components/SearchBox.vue";
import { state } from "../state";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    AppFooter,
    SearchInMap,
    SearchBox,
  },
  data() {
    return {
      state,
      tt: window.tt,
      radius: 20000, // raggio ricerca
      propertiesList: [],
      propertiesCoordinates: [],
      lng: "",
      lat: "",
      sponsoredList: [],
    };
  },
  methods: {
    // conversione indirizzo cercato in coordinate
    geocoding() {
      this.tt.services
        .geocode({
          key: state.tt_key,
          query: this.getSearchboxValue(),
          bestResult: true,
          language: "it-IT",
        })
        .then((res) => {
          this.lng = res.position.lng;
          this.lat = res.position.lat;
          this.getPropertyList();
        });
    },
    getPropertyList() {
      axios
        .get(
          this.state.api_url +
          `/api/properties/search/lng=${this.lng}/lat=${this.lat}/radius=${this.radius}`
        )
        .then((res) => {
          this.propertiesList = res.data;
          //console.log(this.propertiesList);

          // svuoto array coordinate degli appartamenti trovati
          this.propertiesCoordinates = [];

          // salvo coordinate degli appartamenti trovati per visualizzare la posizione sulla mappa
          this.propertiesList.forEach((ele) => {
            let obj = {
              lng: ele.longitude,
              lat: ele.latitude,
            };
            this.propertiesCoordinates.push(obj);
          });
          this.$refs.map.moveMap();
          setTimeout(() => this.$refs.map.addMarker(), 500);
        })
        .catch((err) => console.error(err));
    },
    getSponsoredProperty(url) {
      axios
        .get(url)
        .then((response) => {
          // console.log(response);
          this.sponsoredList = response.data.results;
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
        });
    },
    getImagePath(path) {
      if (path) {
        return this.state.api_url + "/storage/" + path;
      }
      return "/images/placeholder.png";
    },
    /* prendi il valore della ricerca su tt */
    getSearchboxValue() {
      return document.querySelector("input.tt-search-box-input").value;
    },
    created() {
      // richiamo funzione in componente figlio (mappa + searchbox)
      this.$refs.map.getMap();
      this.$refs.search_box.getSearchBox();
    },
  },
  mounted() {
    this.getSponsoredProperty(this.state.api_url + '/api/sponsored')
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="parallax_group hero-container">
      <div class="parallax_layer header">
        <nav class="navbar bg-transparent shadow-none navbar-expand-md px-4">
          <div class="container">
            <router-link class="navbar-brand d-flex align-items-center" :to="{ name: 'home' }" aria-current="page">
              <img class="img-fluid logo" style="height: 77px" src="/images/logo_nav.png" alt="" />
            </router-link>
            <button class="navbar-toggler d-md-none p-2 border border-white" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="toggler-icon text-white"><font-awesome-icon icon="fa-solid fa-bars" /></span>
            </button>
            <div class="collapse navbar-collapse flex-md-grow-0" id="navbarSupportedContent">
              <ul class="navbar-nav m-auto">
                <li class="nav-item pe-3">
                  <a href="#search" class="nav-link">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </a>
                </li>
                <li class="nav-item pe-3">
                  <router-link active-class="active" class="nav-link" :to="{ name: 'properties' }">ALL
                    PROPERTIES</router-link>
                </li>
                <li class="nav-item pe-3">
                  <router-link active-class="active" class="nav-link" :to="{ name: 'about' }">ABOUT US</router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!--/.header-->
      <div class="parallax_layer sky"></div>
      <div class="parallax_layer hero-text">
        <div class="text text-center">
          <h2 class="text-white">CHOOSE YOUR</h2>
          <h1 class="text-white">NEXT DESTINATION</h1>
        </div>
      </div>
      <div class="parallax_layer city"></div>
      <div class="parallax_layer scroll-down text-white">
        <font-awesome-icon icon="fa-solid fa-angles-down" size="3x" />
      </div>
    </div>
    <!--/.hero-container-->
    <div class="parallax_group info-container">
      <div class="container">
        <div class="best-properties py-5 text-center">
          <h2 class="mb-3">PROPERTIES TO LOVE</h2>

          <div class="sponsorized-list">





            <div class="card text-bg-dark" v-for="sponsored in sponsoredList">
              <img :src="getImagePath(sponsored.image)" class="card-img" alt="">
              <div class="card-img-overlay d-flex flex-column justify-content-between p-3">
                <div class="info-top">
                  <h4 class="card-title">{{ sponsored.title }}</h4>
                  <p class="card-text">{{ sponsored.address }}</p>
                  <h5 class="card-text text-orange">{{ sponsored.price }}</h5>
                </div>
                <div class="info-bottom d-flex justify-content-between align-items-center">
                  <h6 class="text-orange">
                    <font-awesome-icon icon="fa-solid fa-door-open" />
                    {{ sponsored.rooms_num }}
                  </h6>
                  <h6 class="text-orange">
                    <font-awesome-icon icon="fa-solid fa-bed" />
                    {{ sponsored.beds_num }}
                  </h6>
                  <h6 class="text-orange">
                    {{ sponsored.square_meters }} m&sup2;
                  </h6>
                </div>
              </div>
            </div>





          </div>
          <router-link active-class="active" class="btn bck-orange rounded-pill px-3" :to="{ name: 'properties' }">VIEW
            ALL PROPERTIES</router-link>
        </div>
        <!--/.best-properties-->
        <div class="search py-5">
          <div class="row row-cols-1 row-cols-md-2">
            <div class="col">
              <div class="search-bar p-3">
                <h4 class="text-orange mb-3">Search properties near you!</h4>
                <!-- <input
                                  type="text"
                                  placeholder="What's your destination?"
                                  v-model="addressToSearch"
                                  class="w-100 mb-3 rounded-pill py-2 px-3"
                                  @keyup.enter="geocoding"
                                /> -->
                <SearchBox ref="search_box" @keyup.enter="geocoding" />
                <div class="d-flex align-items-center justify-content-around py-1">
                  <SearchInMap class="sticky-top" ref="map" :center="[this.lng, this.lat]"
                    :propertiesFound="this.propertiesCoordinates" />
                </div>
              </div>
            </div>

            <div class="col">
              <div class="propertyList d-flex rounded gap-2">
                <div class="card text-bg-dark p-0 border-0" style="max-height: 550px; max-width: 352px"
                  v-for="property in propertiesList">
                  <div class="card-img overflow-hidden rounded">
                    <router-link :to="{
                      name: 'single-property',
                      params: { slug: property.slug },
                    }">
                      <img class="img-fluid photo-zoom card-img" :src="getImagePath(property.image)" alt="" />
                    </router-link>
                  </div>
                  <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div class="icons d-flex justify-content-between mb-2">
                      <h5 class="text-orange">
                        <font-awesome-icon icon="fa-solid fa-door-open" />
                        {{ property.rooms_num }}
                      </h5>
                      <h5 class="text-orange">
                        <font-awesome-icon icon="fa-solid fa-bed" />
                        {{ property.beds_num }}
                      </h5>
                      <h5 class="text-orange">
                        {{ property.square_meters }} &#13217;
                      </h5>
                    </div>

                    <h5 class="card-title">{{ property.title }}</h5>
                    <h6 class="card-text">{{ property.address }}</h6>
                    <h6 class="card-text text-orange">
                      {{ property.price }} &euro;
                    </h6>
                    <h6 class="card-text text-orange" v-if="property.type">
                      Type: {{ property.type.name }}
                    </h6>
                    <h6 v-else>no types yet</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--/.search-->
          <a name="search"></a>
        </div>
      </div>
    </div>
    <!--/.info-container-->
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 400px;
}

.propertyList {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem;

  .card {
    flex: 0 0 100%;
    padding: 1rem;
    border-radius: 8px;
    scroll-snap-align: start;
  }
}
</style>
