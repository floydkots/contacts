<template>
  <div>
    <v-content>
      <v-container
        fluid
        fill-height
        class="pl-1 pr-1 pt-2"
      >
        <v-layout row>
          <v-flex xs12>
            <contacts/>
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
      @click.stop="toggleAddContact"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <!-- Add Contact Markup start -->
    <add-contact
      ref="add_contact_dialog"
    />
    <!-- Add Contact Markup end -->
  </div>
</template>

<script>
  import Contacts from './Contacts.vue'
  import AddContact from './AddContact.vue'

  export default {
    data: () => ({

    }),
    methods: {
      toggleAddContact: function () {
        this.$store.dispatch('toggleAddContact')
        this.$nextTick(() => {
          this.$refs.add_contact_dialog.$refs.fullName.focus()
        })
      }
    },

    components: {
      AddContact,
      Contacts
    }
  }
</script>
