<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PropertiesList from "../components/PropertiesList.vue";
import { state } from "../state";

export default {
  name: "PropertiesView",
  components: { AppHeader, AppFooter, PropertiesList },
  data() {
    return {
      state,
      apiKey: "BNYqu6i8McfAozT5DuF9E7cCsyItsHYt",
      addressToSearch: "",
      tt: window.tt,
      radius: "", // raggio ricerca
      rooms: "",
      beds: "",
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
          this.lng = res.position.lng;
          this.lat = res.position.lat;
          this.getFilteredList();
        });
    },
    getFilteredList() {
      axios
        .get(
          this.state.api_url +
            `/api/properties/filteredsearch/lng=${this.lng}/lat=${this.lat}/radius=${this.radius}/rooms=${this.rooms}/beds=${this.beds}`
        )
        .then((res) => {
          this.filteredList = res.data;
          console.log(this.filteredList);

          // svuoto array coordinate degli appartamenti trovati
          this.propertiesCoordinates = [];

          // salvo coordinate degli appartamenti trovati per visualizzare la posizione sulla mappa
          this.filteredList.forEach((ele) => {
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
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <div class="banner search-properties p-5">
      <div class="container p-5">
        <div class="search-bar text-center py-5">
          <form class="d-flex">
            <div class="locality">
              <input
                type="text"
                placeholder="Dove vuoi andare?"
                v-model="addressToSearch"
                class="w-100 mb-3 rounded-pill px-2 px-2"
                @keyup.enter="geocoding"
              />
            </div>
            <div class="radius">
              <label for="radius" class="form-label text-orange">Radius</label>
              <input
                type="number"
                name="radius"
                id="radius"
                class="form-control"
                placeholder=""
                min="1"
                max="100"
                v-model="radius"
              />
            </div>

            <div class="rooms">
              <label for="rooms_num" class="form-label text-orange"
                >Rooms</label
              >
              <input
                type="number"
                name="rooms_num"
                id="rooms_num"
                class="form-control"
                placeholder=""
                min="1"
                max="100"
                v-model="rooms"
              />
            </div>
            <div class="beds">
              <label for="beds_num" class="form-label text-orange">Beds</label>
              <input
                type="number"
                name="beds_num"
                id="beds_num"
                class="form-control"
                placeholder=""
                min="1"
                max="100"
                v-model="beds"
              />
            </div>
            <input type="submit" @click="geocoding()" />
          </form>
        </div>
      </div>
    </div>
    <PropertiesList></PropertiesList>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped></style>
