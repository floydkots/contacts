<template>
  <v-app>
    <!-- Navivation Drawer Markup start -->
    <drawer></drawer>
    <!-- Navigation Drawer Markup end -->


    <!--Toolbar Markup start -->
    <main-toolbar></main-toolbar>
    <!-- Toolbar Markup End -->

    <!-- Search Toolbar Markup start -->
    <search-toolbar></search-toolbar>
    <!-- Search Toolbar Markup end -->

    <!-- Select Toolbar Markup start -->
    <select-toolbar></select-toolbar>
    <!-- Select Toolbar Markup end -->

    <v-content>
      <v-container
        fluid
        fill-height
        class="pl-1 pr-1 pt-2"
      >
        <v-layout row>
          <v-flex xs12>
            <contacts></contacts>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="$store.dispatch('toggleAddContact')"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <!-- View Contact Markup start -->
    <view-contact></view-contact>
    <!-- View Contact Markup end -->

    <!-- Edit Contact Markup start -->
    <edit-contact></edit-contact>
    <!-- Edit Contact Markup end -->

    <!-- Add Contact Markup start -->
    <add-contact></add-contact>
    <!-- Add Contact Markup end -->
  </v-app>
</template>

<script>
  import Drawer from './Drawer.vue'
  import MainToolbar from './MainToolbar.vue'
  import SearchToolbar from './SearchToolbar'
  import SelectToolbar from "./SelectToolbar"
  import Contacts from './Contacts.vue'
  import AddContact from './AddContact.vue'
  import EditContact from './EditContact.vue'
  import ViewContact from './ViewContact.vue'
  import contactsApi from '../api/contacts'

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
      AddContact,
      EditContact,
      Contacts,
      ViewContact
    },
    mounted() {
      let contacts = contactsApi.fetch();
      this.$store.dispatch('setContacts', contacts);
      this.$store.dispatch('setTooltips');
    }
  }
</script>