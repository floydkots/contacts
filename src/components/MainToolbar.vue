<template>
  <div>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      fixed
      clipped-left
      :prominent="true"
      ref="main_toolbar"
    >
      <v-toolbar-title
        :style="$vuetify.breakpoint.smAndUp ? 'width: 200px; min-width: 100px' : 'min-width: 72px'"
        class="ma-0 pl-1"
      >
        <v-toolbar-side-icon
          @click.stop="$store.dispatch('toggleDrawer')"
        >
        </v-toolbar-side-icon>
        <span
          class="hidden-xs-only"
        >
          <b>Kots</b> Contacts
        </span>
      </v-toolbar-title>

      <v-tooltip
        bottom
        :disabled="$store.state.tooltips"
      >
        <span>Search</span>
        <v-btn
          flat
          icon
          slot="activator"
          @click="toggleSearch"
        >
          <v-icon>
            search
          </v-icon>
        </v-btn>
      </v-tooltip>

      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon large>
          <v-avatar size="32px">
            <img
              src="../../public/avatars/floydkots_avatar.jpg"
              alt="Floyd Kots"
            >
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "main-toolbar",
    data: () => {
      return {}
    },
    methods: {
      toggleSearch: function() {
       this.$store.dispatch('toggleSearch');
       this.$nextTick(() => {
         $('#search').focus();
       });
      }
    }
  }
</script>

<style scoped>

</style>