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
      hasSponsorship: [],
      hasNoSponsorship: [],
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
          console.log(response.data);
          this.properties = response.data.results;
          console.log(this.properties);
          this.loading = false;
          for (let i = 0; i < this.properties.length; i++) {
            let property = this.properties[i];
            if (property.sponsorships.length > 0) {
              this.hasSponsorship.push(property);
            } else {
              this.hasNoSponsorship.push(property);
            }
          }
          console.log(this.hasSponsorship);
          console.log(this.hasNoSponsorship);
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
          this.loading = false;
        });
    },
    prevPage(url) {
      console.log(url);
      this.getProperties(url);
    },
    nextPage(url) {
      console.log(url);
      this.getProperties(url);
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
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-4">


          <div class="col" v-for="property in hasSponsorship">
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
                    {{ property.square_meters }} m&sup2
                  </h5>
                </div>
                <h4 class="card-title">{{ property.title }}</h4>
                <p class="card-text">{{ property.address }}</p>
                <h4 class="card-text text-orange">{{ property.price }} &euro;</h4>
                <div class="type my-3">
                  <strong class="text-orange" v-if="property.type">
                    Type: {{ property.type.name }}
                  </strong>
                  <span v-else></span>
                </div>
              </div>
            </div>
          </div>

          <div class="col" v-for="property in hasNoSponsorship">
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
                    {{ property.square_meters }} m&sup2
                  </h5>
                </div>
                <h4 class="card-title">{{ property.title }}</h4>
                <p class="card-text">{{ property.address }}</p>
                <h4 class="card-text text-orange">{{ property.price }} &euro;</h4>
                <div class="type my-3">
                  <strong class="text-orange" v-if="property.type">
                    Type: {{ property.type.name }}
                  </strong>
                  <span v-else></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>

      <template v-else-if="loading">
        <div class="loading py-5 w-100 text-center">
          <div class="loader py-5">
            <img src="/images/loader.gif" class="img-fluid rounded-circle mb-4" style="max-height: 400px" alt="" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="loading-fail py-5 mb-4 w-100 text-center">
          <div class="no-file py-5" style="height: 500px">
            <h1>No properties yet!</h1>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
