<script lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
    name: 'PropertiesView',
    components: { AppHeader, AppFooter }
}
</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <div class="banner search-properties p-5">
            <div class="container p-5">
                <h2 class="text-white">SEARCH ADVANCED BAR HERE</h2>
            </div>
        </div>
    </main>
    <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>