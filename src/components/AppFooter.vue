<script>
export default {
    name: "AppFooter",
}
</script>

<template>
    <footer>
        <div class="footer-top py-5">
            <div class="container">
                <ul class="d-flex flex-column flex-md-row list-unstyled align-items-center justify-content-between">
                    <li class="text-center">
                        <h5 class="text-orange">PROPERTIES</h5>
                        <router-link active-class="active" class="nav-link" :to="{ name: 'properties' }">SEE ALL
                            PROPERTIES</router-link>
                    </li>
                    <li class="text-center py-3 py-md-0">
                        <h5 class="text-orange">BOOLBNB</h5>
                        <router-link active-class="active" class="nav-link" :to="{ name: 'about' }">ABOUT
                            US</router-link>
                    </li>
                    <li class="text-center">
                        <h5 class="text-orange">RESOURCES</h5>
                        <router-link active-class="active" class="nav-link" :to="{ name: 'home' }">OWNER'S
                            PORTAL</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom py-2">
            <div class="container">
                <ul class="d-flex flex-column flex-md-row list-unstyled align-items-center justify-content-between m-0">
                    <li class="text-center">
                        <span><small>COPYRIGHT&copy; 2023 - TEAM4</small></span>
                    </li>
                    <li class="text-center">
                        <router-link class="navbar-brand d-flex align-items-center" :to="{ name: 'home' }"
                            aria-current="page">
                            <img class="img-fluid logo" style="height:50px" src="/images/logo_small.png" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>

</style>