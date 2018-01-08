<template>
  <v-dialog
    v-model="$store.state.delete_contact"
    max-width="250px"
  >
    <v-card>
      <v-card-text
        class="subheading text-xs-center"
      >
        Delete this contact?
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          large
          color="blue darken-1"
          @click.native="toggleDelete"
        >
          Cancel
        </v-btn>
        <v-btn
          flat
          large
          color="red darken-1"
          @click.native="deleteContact"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { deleteContact } from '../api/database'

  export default {
    name: 'delete-contact',
    methods: {
      toggleDelete: function () {
        this.$store.dispatch('toggleDeleteContact')
      },

      deleteContact: function () {
        this.$store.dispatch('setSnackbar', {
          color: 'info',
          message: 'Deleting contact...'
        })
        let contactId = this.$store.getters.getActiveId
        const deleteCallback = (error) => {
          let snackbar = {}
          if (error) {
            snackbar = {
              color: 'error',
              message: `${error}`
            }
          } else {
            snackbar = {
              color: 'success',
              message: 'Contact deleted successfully!'
            }
          }
          this.$store.dispatch('setSnackbar', snackbar)
        }
        deleteContact(contactId, deleteCallback)
        this.toggleDelete()
        if (this.$store.state.view_contact) this.$store.dispatch('toggleViewContact')
      }
    }
  }
</script>

<style scoped>

</style>
