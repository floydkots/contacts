<template>
  <v-dialog
    persistent
    v-model="$store.state.slim.active"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="700px"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        Upload avatar
      </v-card-title>
      <v-container>
        <v-layout>
          <v-flex
            xs8 offset-xs2
            sm8 offset-sm2
            md8 offset-md2
          >
            <div
              ref="cropper"
              class="slim subheading"
              :style="{cursor: 'pointer'}"
            >
              <input type="file" name="slim[]">
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn
          large
          color="primary"
          class="mr-0"
          @click="cancelSlim"
          :style="{margin: '0 auto'}"
        >
          Cancel
        </v-btn>

        <v-btn
          large
          color="success"
          @click="doneSlim"
          :style="{margin: '0 auto'}"
          :disabled="!avatar_ready"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import firebase from 'firebase';
  import { avatarsRef, saveContact } from "../api/database";
  import Slim from '../../public/js/slim.module';

  export default {
    name: 'slim-cropper',
    data () {
      return {
        slim: null,
        avatar_ready: false,
        avatar_removed: false,
        editing_contact: this.editingContact || false,
        options: {
          ratio: '1:1',
          initialImage: '',
          service: this.slimService,
          didInit: this.slimInit,
          didLoad: this.slimLoaded,
          didRemove: this.slimRemoved,
          didUpload: this.slimUploaded,
          label: `Drop your avatar here. Or click to select.`,
          statusUploadSuccess: 'Avatar Uploaded successfully.',
          maxFileSize: 0.5,
          serviceFormat: 'file',
          instantEdit: false,
        }
      }
    },

    props: ['state'],

    methods: {
      cancelSlim: function() {
        if (this.$store.state.slim) {
          this.slim.remove();
        }
        if (this.$store.state.add_contact) {
          this.setAvatar('');
        } else if (this.$store.state.view_contact) {
          // Do something
        }

        this.avatar_ready = false;
        this.$store.dispatch('setSlim', {active: false});
      },

      doneSlim: function() {
        if (this.avatar_removed) this.setAvatar("");
        if (this.$store.state.view_contact) {
          this.updateContact();
        }
        this.slim.remove();
        this.avatar_ready = false;
        this.$store.dispatch('setSlim', {active: false});
      },

      updateContact: function() {
        this.$store.dispatch('setSnackbar', {
          color: 'info',
          message: 'Updating contact...',
        });
        let my_this = this;
        function saveCallback(error) {
          let snackbar = {};
          if (error) {
            snackbar = {
              color: 'error',
              message:`${error}`,
            };
          } else {
            snackbar = {
              color: 'success',
              message: 'Contact updated successfully!',
            };
          }
          my_this.$store.dispatch('setSnackbar', snackbar);
        }
        saveContact(this.$store.state.slim.contact, saveCallback);
      },

      setAvatar: function(avatar) {
        if (this.$store.state.add_contact) {
          let new_contact = this.$store.state.new_contact;
          new_contact.avatar = avatar;
          this.$store.dispatch('setNewContact', new_contact);
        } else if (this.$store.state.edit_contact || this.$store.state.view_contact) {
          let contact = this.$store.state.slim.contact;
          contact.avatar = avatar;
        }
      },

      slimLoaded: function(file, image, meta) {
        this.avatar_ready = false;
        return true;
      },

      slimRemoved: function(data) {
        if (this.$store.state.edit_contact || this.$store.state.view_contact) {
          this.avatar_removed = true;
          this.avatar_ready = true;
        }
        if (!this.$store.state.slim.contact.avatar) {
          this.avatar_ready = false;
        }
      },

      slimUploaded: function(error, data, response) {
        this.avatar_ready = !error;
      },
      // called when slim has initialized
      slimInit: function (data, slim) {
        //slim instance reference
        this.$store.dispatch('setSlim', {active: false, instance: slim});

        //current slim data object and slim reference
        //console.log(data);
      },

      // called when upload button is pressed or                 // automatically if push is enabled
      slimService: function (file, progress, success, failure) {
        this.$store.dispatch('setSnackbar', {color: 'info', message: 'Uploading avatar...'});
        file = file[0];
        let my_this = this;
        // console.log('this in Slim.vue: ', this);
        // Upload file to the object
        let timestamp = Date.now();
        let uploadTask = avatarsRef.child('avatars/' + `${file.name}-${timestamp}`).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded.
          progress(snapshot.bytesTransferred, snapshot.totalBytes);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              // console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              // console.log('Upload is running');
              break;
          }
        }, function(error) {
          switch(error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              failure('You do not have permission to access the object.');
              my_this.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'You do not have permission to access the object.'
              });
              break;

            case 'storage/canceled':
              // User canceled the upload
              failure('The update was cancelled.');
              my_this.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'The update was cancelled.'
              });
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              failure('An unknown error occurred.');
              my_this.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'An unknown error occurred.'
              });
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          success('Avatar uploaded successfully.');
          const downloadURL = uploadTask.snapshot.downloadURL;
          my_this.setAvatar(downloadURL);
          my_this.$store.dispatch('setSnackbar', {color: 'success', message: 'Avatar uploaded successfully.'})
        });
      }
    },

    mounted() {
      this.slim = new Slim(this.$refs['cropper'], this.options);
    },

    destroyed: function () {
      this.slim.destroy()
    }
  }
</script>
<style lang="css">
  @import "../../public/css/slim.min.css";
</style>
