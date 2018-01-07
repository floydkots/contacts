<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    v-model="$store.state.drawer"
  >
    <v-list dense>
      <template v-for="(item, i) in items">

        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="i"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>

        <v-list-group v-else-if="item.children" v-model="item.model" no-action>
          <v-list-tile
            slot="item"
            @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click=""
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-divider
          v-else-if="item.divider"
          v-bind:inset="item.inset"
          class="mt-1 mb-1"
        >
        </v-divider>

        <v-list-tile
          v-else
          :to="item.route ? item.route : null"
          :exact="true"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text  === 'Contacts' ? `${item.text} (${numOfContacts})` : `${item.text}`}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "drawer",
    data: () => ({
      numOfContacts: 0,
      items: [
        {
          icon: 'contacts', text: 'Contacts', route: '/contacts'
        },
        {icon: 'history', text:'Frequently accessed', route: '/frequent'},
        {icon: 'content_copy', text: 'Duplicates', route: '/merge'},

        {divider: true, inset: false},

        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: false,
          children: [
            {icon: 'add', text: 'Create label'}
          ]
        },

        {divider: true, inset: false},

        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            {text: 'Import'},
            {text: 'Export'},
            {text: 'Print'},
            {text: 'Undo changes'},
            {text: 'Other contacts'}
          ]
        },

        {divider: true, inset: false},

        {icon: 'settings', text: 'Settings'},
        {icon: 'chat_bubble', text: 'Send feedback'},
        {icon: 'help', text: 'Help'},
      ]
    }),
    beforeUpdate () {
      this.numOfContacts = this.$store.getters.getContacts.length;
    }
  }
</script>

<style scoped>

</style>