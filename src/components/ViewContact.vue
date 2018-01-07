<template>
  <v-dialog
    v-model="$store.state.view_contact"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="700px"
    :transition="$store.state.view_transition"
    :hide-overlay="false"
  >
    <v-card>
      <v-card-actions
        class="py-3 px-4 title grey lighten-4"
        :style="{minHeight: '60px'}"
      >
        <v-flex
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <v-avatar
            size="70px"
            class="mr-3"
            @click="openSlim"
            @mouseenter="avatar_hover = true"
            @mouseleave="avatar_hover = false"
            :style="{
                    cursor: 'pointer',
                    backgroundSize: 'contain',
                    backgroundColor: 'white',
                    backgroundImage: contact.avatar ? `url(${contact.avatar})` : 'url(https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    border: '5px solid #E3E3DE'
                  }"
          >
            <v-btn
              fab
              color="black"
              class="ma-0"
              :style="{opacity: avatar_hover ? '0.5' : '0'}"
            >
              <v-icon
                large
                color="white"
              >
                photo_camera
              </v-icon>
            </v-btn>
          </v-avatar>
          <span
            class="py-4 headline"
          >
            {{ contact.fullName }}
          </span>
        </v-flex>

        <v-tooltip
          bottom
          v-if="$vuetify.breakpoint.smAndDown"
          :disabled="$store.state.tooltips"
        >
          <span>Close</span>
          <v-btn
            flat
            icon
            small
            color="grey darken-3"
            slot="activator"
            class="pa-0 ma-0"
            @click="toggleView"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-tooltip>

        <v-spacer/>

        <v-tooltip
          bottom
          :disabled="$store.state.tooltips"
        >
          <span>Star contact</span>
          <v-btn
            flat
            icon
            small
            slot="activator"
            class="pa-0 ma-0"
            @click="contact ? contact.starred = !contact.starred : false"
          >
            <v-icon
              v-if="contact ? !contact.starred : false"
              color="grey darken-3"
            >
              star_border
            </v-icon>
            <v-icon
              v-else
              color="pink"
            >
              star
            </v-icon>
          </v-btn>
        </v-tooltip>

        <v-tooltip
          bottom
          :disabled="$store.state.tooltips"
        >
          <span>Edit contact</span>
          <v-btn
            flat
            icon
            small
            color="grey darken-3"
            slot="activator"
            class="pa-0 ma-0"
            @click="toggleEdit(contact.id)"
          >
            <v-icon>mode_edit</v-icon>
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
              class="pa-0 ma-0"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                avatar
                v-for="item in $store.getters.getMoreItems"
                :key="item.title"
                @click="moreActions(item.name, contact.id)">
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

        <v-tooltip
          bottom
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <span>Close</span>
          <v-btn
            flat
            icon
            small
            color="grey darken-3"
            slot="activator"
            class="pa-0 ma-0"
            :disabled="$store.state.tooltips"
            @click="toggleView"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-tooltip>

      </v-card-actions>

      <v-card-actions
        class="py-0 px-0 title"
        v-if="$vuetify.breakpoint.smAndDown"
        :style="{borderTop: '1px solid lightgray'}"
      >
        <v-flex
          class="grey lighten-4 ma-0 pa-4"
          :style="{border: '0'}"
        >
          <v-avatar
            size="70px"
            class="mr-3"
            @click="openSlim"
            @mouseenter="avatar_hover = true"
            @mouseleave="avatar_hover = false"
            :style="{
                    cursor: 'pointer',
                    backgroundSize: 'contain',
                    backgroundColor: 'white',
                    backgroundImage: contact.avatar ? `url(${contact.avatar})` : 'url(https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    border: '5px solid #E3E3DE'
                  }"
          >
            <v-btn
              fab
              color="black"
              class="ma-0"
              :style="{opacity: avatar_hover ? '0.5' : '0'}"
            >
              <v-icon
                color="white"
                large
              >
                photo_camera
              </v-icon>
            </v-btn>
          </v-avatar>

          <span
            class="headline"
          >
            {{ contact.fullName }}
          </span>
        </v-flex>
      </v-card-actions>

      <v-list
        subheader
        three-line
        class="pt-3 pb-5"
        :style="{borderBottom: '1px solid lightgray'}"
      >
        <v-subheader
          class="pt-2 pl-4"
          :style="{color: 'black'}"
        >
          Contact details
        </v-subheader>

        <v-list-tile
          avatar
          class="ml-4 pl-2 pb-5"
          v-for="item in iterableContactDetails"
          :key="item.icon"
          :style="{maxHeight: '60px'}"
        >
          <!--TODO add dateOfBirth to iterableContactDetails-->
          <v-list-tile-avatar
            class="mr-3 pt-0"
          >
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list
              v-for="(detail, index) in item.details"
              :key="index"
              class="pb-0"
            >
              <v-list-tile-sub-title
                v-html="detail">
              </v-list-tile-sub-title>
            </v-list>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "view-contact",
    data: () => {
      return {
        avatar_hover: false,
        temp_contact: {
          id:null,
          fullName: "",
          avatar: "",
          emails: [],
          phones: [],
          addresses: [],
          starred: false,
          hidden: false
        }
      }
    },

    methods: {
      openSlim: function() {
        if (this.contact.avatar) {
          this.$store.state.slim.instance.load(this.contact.avatar, (error, data) => {
            if (error) {
              this.$store.dispatch('setSnackbar', {
                color: 'info',
                message: 'Unable to automatically load your avatar. Proceed with manual upload.'
              });
            }
          });
        }
        this.$store.dispatch('setSlim', {contact: this.contact});
      },

      toggleView: function() {
        this.$store.dispatch('setViewTransition', 'dialog-transition');
        this.$store.dispatch('toggleViewContact');
      },

      toggleEdit: function(id) {
        this.$store.dispatch('toggleEditContact');
        this.$nextTick(() => {
          this.$parent.$refs.edit_contact_dialog.$refs.fullName.focus();
        });
      },

      toggleDelete: function() {
        this.$store.dispatch('toggleDeleteContact');
      },

      hideContact: function() {
        //TODO implement this functionality
      },

      moreActions: function(item_name, id) {
        switch(item_name) {
          case 'Delete':
            this.toggleDelete(id);
            break;
          case 'Hide':
            this.hideContact(id);
            break;
        }
      }
    },

    computed: {
      contact: function() {
        const contact = this.$store.getters.getActiveContact;
        if (this.$store.state.edit_contact) {
          this.temp_contact = JSON.parse(JSON.stringify(contact));
        }
        return contact || this.temp_contact;
      },
      iterableContactDetails: function() {
        if (this.contact.hasOwnProperty('id')){
          let iterableContactDetails = [];
          const icons = this.$store.state.icons;
          const no_decoration = `style="text-decoration: none;"`;
          for(let [entry, values] of Object.entries(this.contact)) {
            if (icons.hasOwnProperty(entry)) {
              let details = [];
              switch(entry) {
                case 'emails':
                  for (const email of values) {
                    let detail = `<a href="mailto:${email.value}" ${no_decoration}>${email.value}</a>`;
                    detail += email.label ? ` • ${email.label}` : '';
                    details.push(detail);
                  }
                  break;
                case 'phones':
                  for (const phone of values) {
                    let detail = `<a href="tel:${phone.value}" ${no_decoration}>${phone.value}</a>`;
                    detail += phone.label ? ` • ${phone.label}` : '';
                    details.push(detail);
                  }
                  break;
                case 'addresses':
                  for (const address of values) {
                    const encoded = encodeURIComponent(address.value);
                    const gMapURI = `"https://maps.google.com/maps?q=${encoded}"`;
                    const href = `${gMapURI} target='_blank'`;
                    let detail = `<a href=${href} ${no_decoration}>${address.value}</a>`;
                    detail += address.label ? ` • ${address.label}` : '';
                    details.push(detail)
                  }
                  break;
              }

              iterableContactDetails.push({
                icon: icons[entry],
                details: details
              });
            }
          }
          return iterableContactDetails;
        }
        return {}
      }
    }

  }
</script>

<style scoped>

</style>