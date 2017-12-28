<template>
  <v-toolbar
    color="blue lighten-5"
    light
    app
    fixed
    :prominent="true"
    clipped-left
    ref="select_toolbar"
    :style = "{opacity: $store.getters.getNumSelected <= 0 ? 0 : 1}"
    :manual-scroll="$store.getters.getNumSelected <= 0"
  >
    <v-tooltip
      bottom
      :disabled="$store.state.tooltips"
    >
      <span>Back</span>
      <v-btn
        color="grey darken-3"
        flat
        icon
        class="ml-0 mr-2"
        slot="activator"
        @click="$store.dispatch('setSelected', [])"
      >
        <v-icon>
          keyboard_backspace
        </v-icon>
      </v-btn>
    </v-tooltip>

    <span
      class="subheading mr-5"
      v-if="$vuetify.breakpoint.smAndUp"
    >
      Back
    </span>

    <v-tooltip
      bottom
      :disabled="$store.state.tooltips"
    >
      <span>Select all</span>
      <v-checkbox
        color="blue darken-4"
        v-model="all"
        hide-details
        slot="activator"
        @click.native=""
        light
        class="ml-3 mr-2"
      ></v-checkbox>
    </v-tooltip>

    <span
      class="ml-2 subheading"
      :style="{color: 'blue'}"
    >
      {{$store.getters.getNumSelected}} selected
    </span>

    <v-spacer></v-spacer>

    <v-tooltip
      bottom
      :disabled="$store.state.tooltips"
    >
      <span>Manage labels</span>
    <v-btn
      color="grey darken-3"
      flat
      icon
      slot="activator"
      @click=""
    >
      <v-icon>
        label
      </v-icon>
    </v-btn>
    </v-tooltip>

    <v-tooltip
      bottom
      :max-width="100"
      :disabled="$store.state.tooltips"
    >
      <span>More actions</span>
      <v-menu
        bottom
        left
        origin="center center"
        transition="scale-transition"
        :min-width="250"
        slot="activator"
        class="pa-0 ma-0"
      >
        <v-btn
          flat
          icon
          small
          color="grey darken-3"
          slot="activator"
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            avatar
            v-for="item in $store.getters.getMoreItems"
            :key="item.title"
            @click="">
            <v-list-tile-avatar>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title
              class="body-1 pl-0 ml-0"
            >
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>

      </v-menu>
    </v-tooltip>

  </v-toolbar>
</template>

<script>
  export default {
    name: "select-toolbar",
    data: () => {
      return {

      }
    },
    computed: {
      all: {
        get: function() {
          return this.$store.getters.allSelected;
        },
        set: function(val) {
          if (val) {
            this.$store.dispatch('setSelected', this.$store.getters.getContacts.slice())
          } else {
            this.$store.dispatch('setSelected', []);
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>