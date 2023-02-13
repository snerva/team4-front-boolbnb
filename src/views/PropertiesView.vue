<script lang="ts">
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PropertiesList from "../components/PropertiesList.vue";

export default {
  name: "PropertiesView",
  components: { AppHeader, AppFooter, PropertiesList },
};
</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <div class="banner search-properties p-5">
      <div class="container p-5">
        <div class="search-bar text-center py-5">
          <strong class="text-white">
            ...SEARCH ADVANCED BAR HERE
          </strong>
        </div>
      </div>
    </div>
    <PropertiesList></PropertiesList>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>

</style>
