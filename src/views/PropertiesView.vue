<script lang="ts">
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PropertiesList from "../components/PropertiesList.vue";

export default {
  name: "PropertiesView",
  components: { AppHeader, AppFooter, PropertiesList },
  data() {
    return {
      apiKey: 'BNYqu6i8McfAozT5DuF9E7cCsyItsHYt',
      addressToSearch: '',

      radius: 20000, // raggio ricerca
      propertiesList: [],
      propertiesCoordinates: [],
      lng: '',
      lat: '',
    }
  },
  methods: {
    // conversione indirizzo cercato in coordinate
    geocoding() {
      this.tt.services.geocode({
        key: this.apiKey,
        query: this.addressToSearch,
        bestResult: true,
        language: 'it-IT'
      }).then(res => {
        this.lng = res.position.lng;
        this.lat = res.position.lat;
        this.getPropertyList();

      });
    },
  }
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
              <input type="text" placeholder="Dove vuoi andare?" v-model="addressToSearch"
                class="w-100 mb-3 rounded-pill px-2 px-2" @keyup.enter="geocoding">
            </div>
            <div class="radius">
              <label for="radius" class="form-label text-orange">Rooms</label>
              <input type="number" name="radius" id="radius" class="form-control" placeholder="" value="" min="1"
                max="100" required>
            </div>
            <div class="rooms">
              <label for="rooms_num" class="form-label text-orange">Rooms</label>
              <input type="number" name="rooms_num" id="rooms_num" class="form-control" placeholder="" value="" min="1"
                max="100" required>
            </div>
            <div class="beds">
              <label for="beds_num" class="form-label text-orange">Beds</label>
              <input type="number" name="beds_num" id="beds_num" class="form-control" placeholder="" value="" min="1"
                max="100" required>
            </div>
          </form>
        </div>
      </div>
    </div>
    <PropertiesList></PropertiesList>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>
