<script>
export default {
    name: 'NotFoundView',
}
</script>

<template>
    <div class="not-found bg-dark text-white vh-100">
        <div
            class="text d-flex text-center flex-column align-items-center justify-content-center border border-white p-5">
            <h2 class="mb-5 text-uppercase">Oops, page not found!</h2>
            <router-link active-class="active" class="link" :to="{ name: 'home' }">HOMEPAGE</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.text {
    height: 80vh;
    width: 90%;

    .link {
        font-size: larger;
        color: #ffffff;
        text-decoration: none;

        &:hover {
            color: #ff8d34;
        }
    }
}
</style>