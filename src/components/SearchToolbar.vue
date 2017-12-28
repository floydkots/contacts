<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    :prominent="true"
    clipped-left
    :style="{opacity: $store.state.search ? 1 : 0}"
    :manual-scroll="!$store.state.search"
    ref="search_toolbar"
  >
    <v-tooltip
      bottom
      :disabled="$store.state.tooltips"
    >
      <span>Back</span>
    <v-btn
      flat
      icon
      @click="$store.dispatch('toggleSearch')"
    >
      <v-icon>
        keyboard_backspace
      </v-icon>
    </v-btn>
    </v-tooltip>

    <v-text-field
      light
      solo
      id="search"
      clearable
      single-line
      key="search"
      transition="dialog-bottom-transition"
      prepend-icon="search"
      placeholder="Search"
      style=""
      ref="search"
    ></v-text-field>
  </v-toolbar>
</template>

<script>
  export default {
    name: "search-toolbar",
    updated () {
      if (this.$store.state.search) {
        this.$refs.search.focus();
      }
    }
  }
</script>

<style scoped>

</style>