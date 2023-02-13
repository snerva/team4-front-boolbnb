<script>
import axios from "axios";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import { state } from "../state";

export default {
    name: "SinglePropertyView",
    components: { AppHeader, AppFooter },
    data() {
        return {
            property: null,
            loading: true,
            state,
        };
    },
    mounted() {
        //console.log(this.$route.params.slug);
        const url =
            this.state.api_url + "/api/properties/" + this.$route.params.slug;
        //console.log(url);
        axios
            .get(url)
            .then((response) => {
                if (response.data.success) {
                    this.property = response.data.results;
                    this.loading = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <div class="container">
            <template class="single-project" v-if="property">
                <section class="single-property top p-5 mb-4">
                    <div class="row row-cols-1 row-cols-md-2">
                        <div class="col d-flex justify-content-center align-items-center">
                            <div class="property_title text-center px-3">
                                <h1 class="text-orange">{{ property.title }}</h1>
                                <p>{{ property.address }}</p>
                                <hr class="my-4" />
                                <h3 class="text-orange">{{ property.price }}&euro;</h3>

                                <h4 class="text-orange" v-if="property.visibility">Available</h4>
                                <h4 v-else>Not Available</h4>

                            </div>
                        </div>
                        <div class="col">
                            <div class="img-gallery overflow-hidden">
                                <img class="img-fluid photo-zoom" :src="state.api_url + '/storage/' + property.image"
                                    :alt="property.title" />
                            </div>
                        </div>
                    </div>
                </section>
                <section class="single-property bottom  p-5">
                    <div class="row row-cols-1 row-cols-md-2">
                        <div class="col text-center">
                            <div class="info d-flex justify-content-around mb-3">
                                <h4 class="text-orange"><font-awesome-icon icon="fa-solid fa-door-open" /> {{
                                    property.rooms_num
                                }}
                                </h4>
                                <h4 class="text-orange"><font-awesome-icon icon="fa-solid fa-bed" /> {{
                                    property.beds_num
                                }}</h4>
                                <h4 class="text-orange">{{ property.square_meters }} &#13217;</h4>
                            </div>
                            <div class="description my-5">
                                {{ property.description }}
                            </div>
                            <!-- type -->
                            <div class="type mb-3">
                                <h5 class="text-orange ">Type:
                                    <span v-if="property.type">
                                        {{ property.type.name }}
                                    </span>
                                    <span v-else>no types yet</span>
                                </h5>
                            </div>
                            <!-- /.type -->
                            <div class="amenities mb-3">
                                <h5 class="text-orange">Amenities:
                                    <template v-if="property.amenities.length > 0">
                                        <span v-for="amenity in property.amenities">
                                            #{{ amenity.name }}
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span> No Amenities yet!</span>
                                    </template>
                                </h5>

                            </div>
                        </div>
                        <div class="col">
                            <div class="maps text-center">...CONTACT FORM</div>
                        </div>
                    </div>
                </section>
            </template>
        </div>
    </main>
    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>
