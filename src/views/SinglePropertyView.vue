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
            state,
            property: null,
            loading: true,
            success: false,
            errors: {},
            name: '',
            email: '',
            message: '',
            phone: '',
        };
    },
    methods: {
        SendForm() {

            this.loading = true

            this.errors = {}

            const data = {
                guest_full_name: this.name,
                guest_email: this.email,
                content: this.message,
                guest_phone_number: this.phone,
                property_id: this.property.id
            }

            axios.post(`${this.state.api_url}/api/messages`, data)
                .then(response => {
                    console.log(response.data.success);
                    this.success = response.data.success

                    // Svuota l'input dopo l'invio

                    if (this.success) {
                        this.name = '';
                        this.email = '';
                        this.message = '';
                        this.phone = '';
                    } else {
                        this.errors = response.data.errors
                    }

                    this.loading = false
                })

        }
    },
    mounted() {

        const url =
            this.state.api_url + "/api/properties/" + this.$route.params.slug;

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
                            <div class="contact text-center p-5">
                                <div v-if="success" class="alert alert-success text-start" role="alert">
                                    Messaggio inviato con successo!
                                </div>

                                <form @submit.prevent="SendForm()"
                                    class="border shadow p-3 mb-5 bg-body-tertiary rounded-3  border border-0">

                                    <div class="mb-3">
                                        <label for="" class="form-label">Name</label>
                                        <input type="text" name="name" id="name" v-model="name" class="form-control"
                                            placeholder="Mario Rossi" aria-describedby="fullNameHelper">
                                        <small id="fullNameHelper" class="text-muted">Add your full name</small>
                                        <!-- error -->
                                        <p v-for="(error) in errors.message">
                                            {{ error }}
                                        </p>
                                    </div>


                                    <div class="mb-3">
                                        <label for="" class="form-label">Email</label>
                                        <input type="email" name="email" id="email" v-model="email" class="form-control"
                                            placeholder="mario.rossi@example.com" aria-describedby="emailHelper">
                                        <small id="emailHelper" class="text-muted">Add your email address</small>
                                        <!-- error -->
                                        <p v-for="(error) in errors.message">
                                            {{ error }}
                                        </p>
                                    </div>

                                    <div class="mb-3">
                                        <label for="" class="form-label">Phone</label>
                                        <input type="number" name="phone" id="phone" v-model="phone"
                                            class="form-control" placeholder="+39 3271569777"
                                            aria-describedby="emailHelper">
                                        <small id="emailHelper" class="text-muted">Add your Phone Number</small>
                                        <!-- error -->
                                        <p v-for="(error) in errors.message">
                                            {{ error }}
                                        </p>
                                    </div>

                                    <div class="mb-3">
                                        <label for="" class="form-label">Message</label>
                                        <textarea class="form-control" name="message" id="message" v-model="message"
                                            rows="5"></textarea>
                                        <!-- error -->
                                        <p v-for="(error) in errors.message">
                                            {{ error }}
                                        </p>

                                    </div>


                                    <button type="submit" class="btn bck-orange rounded-pill" :disabled="loading">
                                        {{ loading? 'Sending...': 'Contact me' }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="maps">

                    </div>
                </section>
            </template>
        </div>
    </main>
    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>
