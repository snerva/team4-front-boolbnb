<script>
import axios from "axios";
import { state } from "../state.js";

export default {
  name: "PropertiesList",
  data() {
    return {
      state,
      properties: null,
      error: null,
      loading: true,
    };
  },
  methods: {
    getImagePath(path) {
      if (path) {
        return this.state.api_url + "/storage/" + path;
      }
      return "/images/placeholder.png";
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
  },
  mounted() {
    this.getProperties(this.state.api_url + "/api/properties");
  },
};
</script>

<template>
  <section class="vue-home pt-5">
    <div class="container">
      <template v-if="properties && !loading">
        <div class="row row-cols-1 row-cols-md-4 g-4 mb-4">
          <div class="col" v-for="property in properties.data">
            <div class="card border-0" style="height:100%">
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
                  <h6 class="text-orange"><font-awesome-icon icon="fa-solid fa-door-open" /> {{
                    property.rooms_num
                  }}
                  </h6>
                  <h6 class="text-orange"><font-awesome-icon icon="fa-solid fa-bed" /> {{
                    property.beds_num
                  }}</h6>
                  <h6 class="text-orange">{{ property.square_meters }} &#13217;</h6>
                </div>
                <h4 class="card-title">{{ property.title }}</h4>
                <p class="card-text">{{ property.address }}</p>
                <!-- <p class="card-text">{{ property.latitude }} {{ property.longitude }}</p> -->
                <p class="card-text text-orange">{{ property.price }} &euro;</p>
                <!-- <template v-if="property.description">
                  <p class="card-text">
                    {{ property.description }}
                  </p>
                  <router-link :to="{
                    name: 'single-property',
                    params: { slug: property.slug },
                  }" class="nav-link text-orange">Read more <font-awesome-icon icon="fa-solid fa-arrow-right" />
                  </router-link>
                </template>
                <div v-else>No description for this project</div> -->
                <div class="type my-3">
                  <strong class="text-orange" v-if="property.type">
                    {{ property.type.name }}
                  </strong>
                  <span v-else>no types yet</span>
                </div>
                <!-- <div class="amenities">
                  <template v-if="property.amenities.length > 0">
                    <span v-for="amenity in property.amenities">
                      #{{ amenity.name }}
                    </span>
                  </template>
                  <template v-else>
                    <span>No Amenities yet!.</span>
                  </template>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="loading">
        <div class="loading">
          Loading ...
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-hourglass-split" viewBox="0 0 16 16">
            <path
              d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
          </svg>
        </div>
      </template>
      <div v-else>
        <p>No projects here</p>
      </div>
    </div>
  </section>
</template>

<style lang="" scoped></style>
