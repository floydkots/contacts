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
  import firebase from 'firebase'
  import { avatarsRef, saveContact } from '../api/database'
  import Slim from '../../src/assets/js/slim.module'

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
          minSize: '100, 100',
          service: this.slimService,
          didInit: this.slimInit,
          didLoad: this.slimLoaded,
          didRemove: this.slimRemoved,
          didUpload: this.slimUploaded,
          label: `Drop your avatar here. Or click to select.`,
          statusUploadSuccess: 'Avatar Uploaded successfully.',
          maxFileSize: 2,
          serviceFormat: 'file',
          instantEdit: false
        }
      }
    },

    props: ['state'],

    methods: {
      cancelSlim: function () {
        if (this.$store.state.slim) {
          this.slim.remove()
        }
        if (this.$store.state.add_contact) {
          this.setAvatar({})
        } else if (this.$store.state.view_contact) {
          // Do something
        }

        this.avatar_ready = false
        this.$store.dispatch('setSlim', {active: false})
      },

      doneSlim: function () {
        if (this.avatar_removed) {
          this.setAvatar({})
        } else {
          this.$store.dispatch('setSnackbar', {
            color: 'info',
            message: 'Updating avatar thumbnail...'
          })
          let avatar = this.$store.state.slim.contact.avatar
          this.getThumbnail(avatar.filename)
            .then(thumbnailURL => {
              this.setAvatar({thumbnail: thumbnailURL})
              console.log('doneSlim: Successfully added thumbnail')
              this.$store.dispatch('setSnackbar', {
                color: 'success',
                message: 'Successfully updated avatar thumbnail'
              })
            })
            .catch(error => {
              this.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'Unable to retrieve thumbnail. Error was logged in the console'
              })
              console.log('doneSlim:', error)
              if (this.$store.state.view_contact) {
                this.updateContact()
              }
            })
        }
        this.slim.remove()
        this.avatar_ready = false
        this.$store.dispatch('setSlim', {active: false})
      },

      updateContact: function () {
        this.$store.dispatch('setSnackbar', {
          color: 'info',
          message: 'Updating contact...'
        })
        let myThis = this
        function saveCallback (error) {
          let snackbar = {}
          if (error) {
            snackbar = {
              color: 'error',
              message: `${error}`
            }
          } else {
            snackbar = {
              color: 'success',
              message: 'Contact updated successfully!'
            }
          }
          myThis.$store.dispatch('setSnackbar', snackbar)
        }
        saveContact(this.$store.state.slim.contact, saveCallback)
      },
      getThumbnail: function (avatarFilename) {
        return new Promise(function (resolve, reject) {
          avatarsRef.child(`avatars/thumb_${avatarFilename}`)
            .getDownloadURL()
            .then(url => {
              console.log('getThumbnail: Successfully retrieved thumbnail')
              resolve(url)
            })
            .catch(error => {
              console.log('getThumbnail: Unable to retrieve thumbnail', error)
              reject(error)
            })
        })
      },
      setAvatar: function (avatarObject) {
        let {avatar = '', thumbnail = '', filename = ''} = avatarObject
        let removal = !(avatar || thumbnail || filename)
        if (this.$store.state.add_contact) {
          let newContact = this.$store.state.new_contact
          if (removal) {
            newContact.avatar = null
          } else {
            if (!newContact.avatar) newContact['avatar'] = {avatar: '', thumbnail: '', filename: ''}
            if (avatar) newContact.avatar['avatar'] = avatar
            if (filename) newContact.avatar['filename'] = filename
            if (thumbnail) newContact.avatar['thumbnail'] = thumbnail
          }
          this.$store.dispatch('setNewContact', newContact)
          console.log('setAvatar: Successfully set newContact')
        } else if (this.$store.state.edit_contact || this.$store.state.view_contact) {
          let contact = this.$store.state.slim.contact
          if (removal) {
            contact.avatar = null
          } else {
            if (!contact.avatar) contact['avatar'] = {avatar: '', thumbnail: '', filename: ''}
            if (avatar) contact.avatar['avatar'] = avatar
            if (thumbnail) contact.avatar['thumbnail'] = thumbnail
            if (filename) contact.avatar['filename'] = filename
          }
          if (this.$store.state.view_contact) {
            this.updateContact()
          }
          console.log('setAvatar: Successfully updated contact')
        }
      },
      slimLoaded: function (file, image, meta) {
        this.avatar_ready = false
        return true
      },
      slimRemoved: function (data) {
        if (this.$store.state.edit_contact || this.$store.state.view_contact) {
          this.avatar_removed = true
          this.avatar_ready = true
        }
        if (!this.$store.state.slim.contact.avatar) {
          this.avatar_ready = false
        }
      },

      slimUploaded: function (error, data, response) {
        this.avatar_ready = !error
        this.avatar_removed = false
      },
      // called when slim has initialized
      slimInit: function (data, slim) {
        // slim instance reference
        this.$store.dispatch('setSlim', {active: false, instance: slim})

        // current slim data object and slim reference
        // console.log(data)
      },

      // called when upload button is pressed or                 // automatically if push is enabled
      slimService: function (file, progress, success, failure) {
        this.$store.dispatch('setSnackbar', {color: 'info', message: 'Uploading avatar...'})
        file = file[0]
        let myThis = this
        // console.log('this in Slim.vue: ', this)
        // Upload file to the object
        const timestamp = Date.now()
        const filename = `${file.name}-${timestamp}`
        let avatarUploadTask = avatarsRef.child('avatars/' + filename).put(file)

        // Listen for state changes, errors, and completion of the upload.
        avatarUploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded.
          progress(snapshot.bytesTransferred, snapshot.totalBytes)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              // console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING:
              // console.log('Upload is running')
              break
          }
        }, function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              failure('You do not have permission to access the object.')
              myThis.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'You do not have permission to access the object.'
              })
              break

            case 'storage/canceled':
              // User canceled the upload
              failure('The update was cancelled.')
              myThis.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'The update was cancelled.'
              })
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              failure('An unknown error occurred.')
              myThis.$store.dispatch('setSnackbar', {
                color: 'error',
                message: 'An unknown error occurred.'
              })
              break
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          success('Avatar uploaded successfully.')
          const downloadURL = avatarUploadTask.snapshot.downloadURL
          // Thumbnail is generated upon upload via a firebase function and
          // the prefix 'thumb_' added to the name of the file
          myThis.setAvatar({avatar: downloadURL, filename: filename})
          myThis.$store.dispatch('setSnackbar', {color: 'success', message: 'Avatar uploaded successfully.'})
        })
      }
    },

    mounted () {
      this.slim = new Slim(this.$refs['cropper'], this.options)
    },

    destroyed: function () {
      this.slim.destroy()
    }
  }
</script>
<style lang="css">
  @import '../../src/assets/css/slim.min.css';
</style>
