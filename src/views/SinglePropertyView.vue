<script>
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import { state } from '../state';

export default {
    name: 'SinglePropertyView',
    components: {
        components: { AppHeader, AppFooter }
    },
    data() {
        return {
            property: null,
            loading: true,
            state
        }
    },
    mounted() {
        //console.log(this.$route.params.slug);
        const url = this.state.api_url + '/api/properties/' + this.$route.params.slug
        //console.log(url);
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    this.project = response.data.results
                    this.loading = false
                }
            }).catch(error => {
                console.log(error)
            })
    }
}
</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <section class="single-property top">
            <div class="row row-cols-1 row-cols-md-2">
                <div class="col d-flex justify-content-center align-items-center">
                    <div class="property_title text-center px-3">
                        <h1 class="text-orange">title</h1>
                        <p>Address:</p>
                        <hr>
                        <h2 class="text-orange"> &euro;</h2>
                        <h3 class="text-orange">Available</h3>
                    </div>
                </div>
                <div class="col">
                    <div class="img-gallery overflow-hidden">
                        <img src="" alt="">

                    </div>
                </div>
            </div>
        </section>
        <section class="single-property bottom">
            <div class="row row-cols-1 row-cols-md-2">
                <div class="col text-center">
                    <div class="info d-flex justify-content-around mb-3">
                        <h4 class="text-orange"><i class="fa-solid fa-door-closed"></i> </h4>
                        <h4 class="text-orange"><i class="fa-solid fa-bed"></i></h4>
                        <h4 class="text-orange"> &#13217;</h4>
                    </div>
                    <div class="description mb-3">
                    </div>
                    <!-- type -->
                    <div class="type">
                        <span>Type:</span>
                    </div>
                    <!-- /.type -->
                    <div class="amenities">
                        <h5 class="text-orange">Amenities:</h5>
                    </div>
                </div>
                <div class="col">
                    <div class="maps text-center">
                        ...CONTACT FORM
                    </div>
                </div>
            </div>
        </section>
    </main>
    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>