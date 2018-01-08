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
        slot="activator"
        @click="$store.dispatch('toggleSearch')"
      >
        <v-icon>
          keyboard_backspace
        </v-icon>
      </v-btn>
    </v-tooltip>

    <v-select
      id="search"
      ref="search"
      clearable
      append-icon=""
      prepend-icon="search"
      placeholder="Search"
      autocomplete
      solo
      light
      required
      :items="items"
      item-text="fullName"
      item-value="id"
      :search-input.sync="search"
      v-model="select"
    >
      <template
        v-if="$store.state.contacts.length > 0"
        slot="item" slot-scope="data">
        <v-list-tile-avatar>
          <v-avatar
            size="40px"
            :class="data.item.avatar ? '' : data.item.color"
            :style="{justifyContent: 'center', minWidth: '40px'}"
          >
            <img
              v-if="data.item.avatar"
              :src="data.item.avatar.thumbnail || data.item.avatar.avatar"
              alt="avatar"
            />
            <span
              v-else
              class="headline white--text"
            >
              {{data.item.fullName ? data.item.fullName.slice(0, 1).toUpperCase() : ''}}
            </span>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-title v-html="data.item.fullName"/>
      </template>
    </v-select>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'search-toolbar',
    data () {
      return {
        items: [],
        search: null,
        select: null
      }
    },
    watch: {
      search (val) {
        if (this.$store.state.contacts.length > 0) {
          this.queryContacts(val)
        }
      },

      select (val) {
        if (this.$store.state.contacts.length > 0) {
          if (val !== null && val !== undefined) {
            this.$store.dispatch('setActiveId', val)
            this.$store.dispatch('toggleViewContact')
            this.$store.dispatch('toggleSearch')
            this.$refs.search.clearableCallback()
          }
        }
      }
    },
    methods: {
      queryContacts (v) {
        if (v) {
          this.items = this.$store.state.contacts.filter(e => {
            return (e.fullName || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
        } else {
          this.items = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
