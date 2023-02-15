<script>
import AppFooter from "../components/AppFooter.vue";
import SearchInMap from "../components/SearchInMap.vue";
import { state } from "../state";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    AppFooter,
    SearchInMap,
  },
  data() {
    return {
      state,
      apiKey: "BNYqu6i8McfAozT5DuF9E7cCsyItsHYt",
      addressToSearch: "",
      tt: window.tt,
      radius: 20000, // raggio ricerca
      propertiesList: [],
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
    getImagePath(path) {
      if (path) {
        return this.state.api_url + "/storage/" + path;
      }
      return "/images/placeholder.png";
    },
    created() {
      this.addressToSearch = this.firstQuery;
      this.geocoding();
      // richiamo funzione in componente figlio (mappa)
      setTimeout(() => this.$refs.map.getMap(), 200);
      // this.getServicesList();
    },
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
    <!--/.hero-container-->
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
            <div class="col">
              <div class="search-bar">
                <!-- ricerca indirizzo -->
                <input
                  type="text"
                  placeholder="Dove vuoi andare?"
                  v-model="addressToSearch"
                  class="w-100 mb-3 rounded-pill px-2 px-2"
                  @keyup.enter="geocoding"
                />
                <div
                  class="d-flex align-items-center justify-content-around py-1"
                >
                  <SearchInMap
                    class="sticky-top"
                    ref="map"
                    :center="[this.lng, this.lat]"
                    :propertiesFound="this.propertiesCoordinates"
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="propertyList d-flex rounded gap-2">
                <div class="card" v-for="property in propertiesList">
                  <div class="image overflow-hidden rounded">
                    <router-link
                      :to="{
                        name: 'single-property',
                        params: { slug: property.slug },
                      }"
                    >
                      <img
                        class="img-fluid photo-zoom card-image"
                        :src="getImagePath(property.image)"
                        alt=""
                      />
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
                    <p class="card-text text-orange">
                      {{ property.price }} &euro;
                    </p>
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
          </div>
          <a name="search"></a>
        </div>
      </div>

      <!--/.info-container-->
      <AppFooter></AppFooter>
    </div>
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
