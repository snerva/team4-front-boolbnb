<script>
export default {
    name: "AppHeader",
}
</script>

<template>
    <a name="back"></a>
    <header>
        <nav class="navbar navbar-expand-md px-4">
            <div class="container">
                <router-link class="navbar-brand d-flex align-items-center" :to="{ name: 'home' }" aria-current="page">
                    <img class="img-fluid logo" style="height:77px" src="/images/logo_nav.png" alt="">
                </router-link>
                <button class="navbar-toggler d-md-none p-2 border border-white" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="toggler-icon text-white"><font-awesome-icon icon="fa-solid fa-bars" /></span>
                </button>
                <div class="collapse navbar-collapse flex-md-grow-0" id="navbarSupportedContent">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item pe-3">
                            <router-link active-class="active" class="nav-link" :to="{ name: 'properties' }">ALL
                                PROPERTIES</router-link>
                        </li>
                        <li class="nav-item pe-3">
                            <a class="nav-link" href="http://127.0.0.1:8000/">SELL</a>
                        </li>
                        <li class="nav-item pe-3">
                            <router-link active-class="active" class="nav-link" :to="{ name: 'about' }">ABOUT
                                US</router-link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped></style>