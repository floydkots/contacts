<template>
  <v-app>
    <!-- Navivation Drawer Markup start -->
    <drawer
      ref="drawer"
    ></drawer>
    <!-- Navigation Drawer Markup end -->

    <!--Toolbar Markup start -->
    <main-toolbar
      ref="main_toolbar"
    ></main-toolbar>
    <!-- Toolbar Markup End -->

    <!-- Search Toolbar Markup start -->
    <search-toolbar
      ref="search_toolbar"
    ></search-toolbar>
    <!-- Search Toolbar Markup end -->

    <!-- Select Toolbar Markup start -->
    <select-toolbar
      ref="select_toolbar"
    ></select-toolbar>
    <!-- Select Toolbar Markup end -->

    <router-view></router-view>

    <slim-cropper
      ref="slim_cropper"
    ></slim-cropper>

    <!-- Snackbar Markup start -->
    <v-snackbar
      :timeout="$store.state.snackbar.timeout"
      :color="$store.state.snackbar.color"
      :bottom="true"
      :multi-line="false"
      v-model="$store.state.snackbar.active"
      ref="snackbar"
    >
      {{ $store.state.snackbar.message }}
      <v-btn
        dark
        flat
        @click.native="closeSnackbar"
      >Close</v-btn>
    </v-snackbar>
    <!-- Snackbar Markup end -->
  </v-app>
</template>


<script>
  import Drawer from './Drawer.vue'
  import MainToolbar from './MainToolbar.vue'
  import SearchToolbar from './SearchToolbar'
  import SelectToolbar from "./SelectToolbar"
  import Slim from './Slim.vue';

  import { contactsRef } from "../api/database";

  export default {
    data: () => ({
      items: [
        {icon: 'contacts', text: 'Contacts'},
        {icon: 'history', text:'Frequently contacted'},
        {icon: 'content-copy', text: 'Duplicates'},
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            {icon: 'add', text: 'Create label'}
          ]
        },
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
        {icon: 'settings', text: 'Settings'},
        {icon: 'chat_bubble', text: 'Send feedback'},
        {icon: 'help', text: 'Help'},
        {icon: 'phonelink', text: 'App downloads'},
        {icon: 'keyboard', text: 'Go to the old version'}
      ],
    }),

    props: {
      source: String
    },

    components: {
      Drawer,
      MainToolbar,
      SearchToolbar,
      SelectToolbar,
      'slim-cropper': Slim,
    },

    methods: {
      closeSnackbar: function() {
        this.$store.dispatch('setSnackbar',{ active: false});
      },

      getRandomColor: function() {
        return this.$store.state.colors[Math.floor(Math.random() * this.$store.state.colors.length)];
      }
    },

    created() {
      contactsRef.orderByChild('fullName').on('value', snap => {
        let contacts = [];
        snap.forEach(contact => {
          let my_contact = JSON.parse(JSON.stringify(contact.val()));
          my_contact['color'] = this.getRandomColor();
          contacts.push(my_contact);
        });
        this.$store.dispatch('setContacts', contacts);
      });
      // let contacts = contactsApi.fetch();
      // this.$store.dispatch('setContacts', contacts);
      this.$store.dispatch('setTooltips');
    }
  }
</script>