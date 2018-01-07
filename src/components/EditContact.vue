<template>
  <v-dialog
    v-model="$store.state.edit_contact"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    width="700px"
    transition="dialog-transition"
    :hide-overlay="false"
  >
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        Edit contact
      </v-card-title>
      <div
        :style="{borderBottom: '1px solid lightgrey'}"
      >
        <v-container
          grid-list-sm
          class="pt-4 pb-0">
          <!-- Full Name Markup start -->
          <v-layout
            row
            wrap
            align-center
            class="add-contact-row"
            @mouseleave="fullNameHover = false"
            @mouseenter="fullNameHover = true"
          >
            <v-flex
              xs2
              class="text-xs-center"
              @mouseenter="avatar_hover = true"
              @mouseleave="avatar_hover = false"
            >
              <v-avatar
                size="50px"
                @click="openSlim"
                :style="{
                    cursor: 'pointer',
                    backgroundSize: 'contain',
                    backgroundColor: 'white',
                    backgroundImage: contact.avatar ? `url(${contact.avatar})` : 'url(https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    border: '2px solid #E3E3DE'
                  }"
              >
                <v-btn
                  fab
                  small
                  color="black"
                  class="ma-0"
                  :style="{opacity: avatar_hover ? '0.5' : '0'}"
                >
                  <v-icon
                    color="white"
                  >
                    photo_camera
                  </v-icon>
                </v-btn>
              </v-avatar>
            </v-flex>

            <v-flex
              class="xs8"
            >
              <v-text-field
                autofocus
                ref="fullName"
                class="caption"
                placeholder="Full Name"
                v-model="contact.fullName"
                :rules="fullNameRules"
                required
                :validateOnBlur="true"
              />
            </v-flex>

            <v-flex
              xs1
              class="pb-2 pl-0 ml-0"
            >
              <v-tooltip
                bottom
                v-if="showFullNameRemove()"
                :disabled="$store.state.tooltips"
              >
                <span>Remove</span>
                <v-btn
                  flat
                  icon
                  small
                  slot="activator"
                  color="grey"
                  class="action-button"
                  @click="removeFullName"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-tooltip>
            </v-flex>

          </v-layout>
          <!-- Full Name Markup end -->

          <!-- Date of Birth Markup start -->
          <v-layout
            row
            wrap
            align-center
            class="add-contact-row"
            @mouseleave="dateOfBirthHover = false"
            @mouseenter="dateOfBirthHover = true"
          >
            <v-flex xs2 class="text-xs-center">
              <v-icon>
                event
              </v-icon>
            </v-flex>

            <v-flex xs8>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >

                <v-text-field
                  ref="dateOfBirth"
                  slot="activator"
                  v-model="contact.dateOfBirth"
                  class="caption"
                  placeholder="Date of Birth"
                  readonly
                  :rules="dateOfBirthRules"
                />

                <v-date-picker
                  v-model="contact.dateOfBirth"
                  no-title
                  scrollable
                  actions
                >
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn
                        flat
                        color="primary"
                        @click="cancel"
                      >Cancel</v-btn>

                      <v-btn
                        flat
                        color="primary"
                        @click="save"
                      >OK
                      </v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
              xs1
              class="pb-2 pl-0 ml-0"
            >
              <v-tooltip
                bottom
                v-if="showDateOfBirthRemove()"
                :disabled="$store.state.tooltips"
              >
                <span>Remove</span>
                <v-btn
                  flat
                  icon
                  small
                  slot="activator"
                  color="grey"
                  class="action-button"
                  @click="removeDateOfBirth"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-tooltip>
            </v-flex>
            <v-spacer/>
          </v-layout>
          <!-- Date of Birth Markup end -->

          <!-- Addresses Markup start -->
          <v-list
            class="pt-0 pb-0"
          >
            <v-list-tile
              v-for="address in contact.addresses"
              :key="address.id"
              id="address_tile"
            >

              <!-- Address Markup start -->
              <v-layout
                row
                wrap
                align-center
                class="add-contact-row"
                @mouseenter="currentAddressHover = address.id"
                @mouseleave="currentAddressHover = null"
              >
                <v-flex xs2 class="text-xs-center">
                  <v-icon
                    v-if="showAddressIcon(address.id)"
                  >
                    location_on
                  </v-icon>
                </v-flex>

                <template
                  v-if="address.value.length === 0"
                >
                  <v-flex xs8>
                    <v-text-field
                      ref="addresses"
                      class="caption"
                      placeholder="Address"
                      v-model="address.value"
                    />
                  </v-flex>
                </template>
                <template
                  v-else
                >
                  <v-flex xs5>
                    <v-text-field
                      ref="addresses"
                      class="caption"
                      placeholder="Address"
                      v-model="address.value"
                    />
                  </v-flex>

                  <v-flex xs3>
                    <v-select
                      :items="labels"
                      v-model="address.label"
                      label="Label"
                      single-line
                      autocomplete
                    >
                    </v-select>
                  </v-flex>

                </template>

                <v-flex
                  xs1
                  class="pb-2 pl-0 ml-0"
                >
                  <v-tooltip
                    bottom
                    v-if="showAddressRemove(address)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Remove</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="grey"
                      class="action-button"
                      @click="removeAddress(address)"
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
                <v-flex
                  xs1
                  class="pb-2"
                >
                  <v-tooltip
                    bottom
                    v-if="showAddressAdd(address)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Add</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="blue darken-2"
                      class="ml-0"
                      @click="addAddress"
                    >
                      <v-icon>add_circle</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
              </v-layout>
              <!-- Address Markup end -->

            </v-list-tile>
          </v-list>
          <!-- Addresses Markup end -->

          <!-- Phones Markup start -->
          <v-list
            class="pt-0 pb-0"
          >
            <v-list-tile
              v-for="phone in contact.phones"
              :key="phone.id"
              id="phone_tile"
            >
              <!-- Phone Markup start -->
              <v-layout
                row
                wrap
                align-center
                class="add-contact-row"
                @mouseenter="currentPhoneHover = phone.id"
                @mouseleave="currentPhoneHover = null"
              >
                <v-flex xs2 class="text-xs-center">
                  <v-icon
                    v-if="showPhoneIcon(phone.id)"
                  >
                    phone
                  </v-icon>
                </v-flex>

                <v-flex
                  xs1
                  class="pb-3 pr-2 pl-0 ml-0"
                >
                  <div
                    :id="`country_${phone.id}`"
                    class="ml-0 pl-0"
                  ></div>
                </v-flex>

                <template
                  v-if="!phone.value"
                >
                  <v-flex xs7>
                    <v-text-field
                      :ref="`phone_${phone.id}`"
                      type="tel"
                      class="caption"
                      placeholder="Phone"
                      v-model="phone.value"
                      :id="`country_${phone.id}_text`"
                      required
                      :rules="phoneRules"
                      :validateOnBlur="true"
                    />
                  </v-flex>
                </template>

                <template
                  v-else
                >
                  <v-flex xs4>
                    <v-text-field
                      :ref="`phone_${phone.id}`"
                      type="tel"
                      class="caption"
                      placeholder="Phone"
                      v-model="phone.value"
                      :id="`country_${phone.id}_text`"
                      required
                      :rules="phoneRules"
                      :validateOnBlur="true"
                    />
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                      :items="labels"
                      v-model="phone.label"
                      label="Label"
                      single-line
                      autocomplete
                    >
                    </v-select>
                  </v-flex>
                </template>

                <v-flex
                  xs1
                  class="pb-2 pl-0 ml-0"
                >
                  <v-tooltip
                    bottom
                    v-if="showPhoneRemove(phone)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Remove</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="grey"
                      class="action-button"
                      @click="removePhone(phone)"
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
                <v-flex
                  xs1
                  class="pb-2"
                >
                  <v-tooltip
                    bottom
                    v-if="showPhoneAdd(phone)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Add</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="blue darken-2"
                      class="ml-0"
                      @click="addPhone"
                    >
                      <v-icon>add_circle</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
              </v-layout>
              <!-- Phone Markup end -->
            </v-list-tile>
          </v-list>
          <!-- Phones Markup end -->

          <!-- Emails Markup start -->
          <v-list
            class="pt-0 pb-0"
          >
            <v-list-tile
              v-for="email in contact.emails"
              :key="email.id"
              id="email_tile"
            >
              <!-- Email Markup start -->
              <v-layout
                row
                wrap
                align-center
                class="add-contact-row"
                @mouseenter="currentEmailHover = email.id"
                @mouseleave="currentEmailHover = null"
              >
                <v-flex xs2 class="text-xs-center">
                  <v-icon
                    v-if="showEmailIcon(email.id)"
                  >
                    mail
                  </v-icon>
                </v-flex>

                <template
                  v-if="!email.value"
                >
                  <v-flex xs8>
                    <v-text-field
                      :ref="`email_${email.id}`"
                      placeholder="Email"
                      class="caption"
                      v-model="email.value"
                      required
                      :rules="emailRules"
                      :validateOnBlur="true"
                    />
                  </v-flex>
                </template>

                <template
                  v-else
                >
                  <v-flex xs5>
                    <v-text-field
                      :ref="`email_${email.id}`"
                      placeholder="Email"
                      class="caption"
                      v-model="email.value"
                      required
                      :rules="emailRules"
                      :validateOnBlur="true"
                    />
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                      :items="labels"
                      v-model="email.label"
                      label="Label"
                      single-line
                      autocomplete
                    >
                    </v-select>
                  </v-flex>
                </template>
                <v-flex
                  xs1
                  class="pb-2 pl-0 ml-0"
                >
                  <v-tooltip
                    bottom
                    v-if="showEmailRemove(email)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Remove</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="grey"
                      class="action-button"
                      @click="removeEmail(email)"
                    >
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
                <v-flex
                  xs1
                  class="pb-2"
                >
                  <v-tooltip
                    bottom
                    v-if="showEmailAdd(email)"
                    :disabled="$store.state.tooltips"
                  >
                    <span>Add</span>
                    <v-btn
                      flat
                      icon
                      small
                      slot="activator"
                      color="blue darken-2"
                      class="ml-0"
                      @click="addEmail"
                    >
                      <v-icon>add_circle</v-icon>
                    </v-btn>
                  </v-tooltip>
                </v-flex>
              </v-layout>
              <!-- Email Markup end -->
            </v-list-tile>
          </v-list>
          <!-- Emails Markup end -->
        </v-container>

        <v-card-actions
          class="pt-0"
        >
          <v-spacer/>
          <v-btn
            flat
            large
            color="primary"
            @click="cancelEditContact"
          >Cancel</v-btn>
          <v-btn
            flat
            large
            color="success"
            @click="saveEditedContact"
            :disabled="!validEntries()"
          >Save</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { fetchContact, saveContact } from "../api/database";

  export default {
    name: "edit-contact",
    data: () => {
      return {
        avatar_hover: false,
        menu: false,
        contact: {
          id:null,
          fullName: "",
          avatar: "",
          emails: [],
          phones: [],
          addresses: [],
          starred: false,
          hidden: false
        },
        temp_contact: {
          id:null,
          fullName: "",
          avatar: "",
          emails: [],
          phones: [],
          addresses: [],
          starred: false,
          hidden: false
        },
        labels: ["Home", "Work", "Other"],
        fullNameHover: false,
        dateOfBirthHover: false,
        currentAddressHover: null,
        currentPhoneHover: null,
        currentEmailHover: null,
        fullNameRules: [
          (v) => !!v || 'Full Name is required',
          (v) => v && v.split(" ").length > 1 && v.split(" ")[1].length > 0 || 'Full Name must have at least 2 names'
        ],
        dateOfBirthRules: [
          (v) => !!v || 'Date of Birth is required'
        ],
        phoneRules: [
          (v) => !!v || 'Phone is required'
        ],
        emailRules: [
          (v) => !!v || 'Email is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },

    computed: {
      contactToEdit: function() {
        const contact = this.$store.getters.getActiveContact;
        if (contact) this.temp_contact = JSON.parse(JSON.stringify(contact));
        return contact ? JSON.parse(JSON.stringify(contact)) : this.temp_contact;
      },
      newAddressId: function() {
        return this.contact.addresses.slice(-1)[0].id + 1;
      },
      newPhoneId: function() {
        return this.contact.phones.slice(-1)[0].id + 1;
      },
      newEmailId: function() {
        return this.contact.emails.slice(-1)[0].id + 1;
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
      addAddress: function() {
        this.contact.addresses.push({
          id: this.newAddressId + 1,
          value: "",
          label: ""
        });
      },
      addPhone: function() {
        this.contact.phones.push({
          id: this.newPhoneId + 1,
          value: "",
          label: ""
        })
      },
      addEmail: function() {
        this.contact.emails.push({
          id: this.newEmailId + 1,
          value: "",
          label: ""
        })
      },
      removeAvatar: function() {
        this.contact.avatar = "";
      },
      removeFullName: function() {
        this.contact.fullName = "";
        this.$refs.fullName.reset();
      },
      removeDateOfBirth: function() {
        this.contact.dateOfBirth = null;
        this.$refs.dateOfBirth.reset();
      },
      removeAddress: function(address) {
        if (this.contact.addresses.length > 1) {
          this.contact.addresses = this.contact.addresses.filter(
            (currentAddress) => {
              return currentAddress.id !== address.id;
            })
        } else {
          address.id = null;
          address.value = "";
          address.label = "";
        }
      },
      removePhone: function(phone) {
        if (this.contact.phones.length > 1) {
          this.contact.phones = this.contact.phones.filter(
            (currentPhone) => {
              return currentPhone.id !== phone.id;
            }
          )
        } else {
          phone.id = null;
          phone.value = "";
          phone.label = "";
          let phone_refs = this.$refs[`phone_${phone.id}`];
          if (phone_refs && phone_refs.length > 0) {
            for (let phone_ref of phone_refs) {
              phone_ref.reset();
            }
          }
        }
      },
      removeEmail: function(email) {
        if (this.contact.emails.length > 1) {
          this.contact.emails = this.contact.emails.filter(
            (currentEmail) => {
              return currentEmail.id !== email.id;
            }
          )
        } else {
          email.id = null;
          email.value = "";
          email.label = "";
          let email_refs = this.$refs[`email_${email.id}`];
          if (email_refs && email_refs.length > 0) {
            for (let email_ref of email_refs) {
              email_ref.reset();
            }
          }
        }
      },
      clearEditContact: function() {
        this.removeFullName();
        this.removeDateOfBirth();
        if (this.contact.addresses) {
          for (let address of this.contact.addresses) {
            this.removeAddress(address);
          }
        }
        if (this.contact.phones) {
          for (let phone of this.contact.phones) {
            this.removePhone(phone);
          }
        }
        if (this.contact.emails) {
          for (let email of this.contact.emails) {
            this.removeEmail(email);
          }
        }
      },
      cancelEditContact: function() {
        this.clearEditContact();
        this.contact = JSON.parse(JSON.stringify(this.temp_contact));
        this.$store.dispatch('toggleEditContact');
        this.$store.dispatch('setActiveId', null);
      },
      validEntries: function() {
        let fullName = false;
        if (this.$refs.fullName) {
          fullName = this.$refs.fullName.valid;
        }

        let dateOfBirth = false;
        if (this.$refs.dateOfBirth ) {
          dateOfBirth = this.$refs.dateOfBirth.valid;
        }

        const addresses = () => {
          for (const address of this.$refs.addresses) {
            if (!address.valid) {
              return false;
            }
          }
          return true;
        };

        let phones = () => {
          if (!this.contact.phones) return false;
          for (const phone of this.contact.phones) {
            if (phone.id !== null && phone.id !== undefined) {
              if (!(this.$refs[`phone_${phone.id}`] && this.$refs[`phone_${phone.id}`][0].valid)) {
                return false;
              }
            }
          }
          return this.contact.phones[0] ? !!this.contact.phones[0].value : false;
        };

        let emails = () => {
          for (const email of this.contact.emails) {
            if (email.id !== null && email.id !== undefined) {
              if (!(this.$refs[`email_${email.id}`] && this.$refs[`email_${email.id}`][0].valid)) {
                return false;
              }
            }
          }
          return !!this.contact.emails[0].value;
        };

        return (fullName && dateOfBirth && addresses() && phones() && emails());
      },
      saveEditedContact: function() {
        let my_this = this;
        if (this.validEntries()) {
          this.$store.dispatch('setSnackbar', {
            color: 'info',
            message: 'Saving contact...',
          });
          function callback(error) {
            let snackbar = {};
            if (error) {
              snackbar = {
                color: 'error',
                message:`${error}`,
              };
            } else {
              snackbar = {
                color: 'success',
                message: 'Contact saved successfully!',
              };
            }
            my_this.$store.dispatch('setSnackbar', snackbar);
          }
          saveContact(my_this.contact, callback);
          this.toggleEdit(this.contact.id);
        } else {
          this.$store.dispatch('setSnackbar', {
            color: 'error',
            message: 'There were errors. Correct and resubmit'
          })
        }
      },
      toggleEdit: function(id) {
        this.$store.dispatch('setActiveId', id);
        this.$store.dispatch('toggleEditContact');
        if (!this.$store.state.view_contact) {
          this.$store.dispatch('setViewTransition', false);
          this.$nextTick(() => {
            this.$store.dispatch('toggleViewContact');
          })
        }
      },
      showAddressAdd: function(address) {
        return address.id === this.contact.addresses[this.contact.addresses.length - 1].id && !!address.value;
      },
      showPhoneAdd: function(phone) {
        return phone.id === this.contact.phones[this.contact.phones.length - 1].id && !!phone.value;
      },
      showEmailAdd: function(email) {
        return email.id === this.contact.emails[this.contact.emails.length - 1].id && !!email.value;
      },
      showAddressIcon: function(id) {
        return id === this.contact.addresses[0].id;
      },
      showPhoneIcon: function(id) {
        return id === this.contact.phones[0].id;
      },
      showEmailIcon: function(id) {
        return id === this.contact.emails[0].id;
      },
      showFullNameRemove: function() {
        return !!this.contact.fullName && (Modernizr.touchevents ? true : this.fullNameHover);
      },
      showDateOfBirthRemove: function() {
        return !!this.contact.dateOfBirth && (Modernizr.touchevents ? true : this.dateOfBirthHover);
      },
      showAddressRemove: function(address) {
        return this.currentAddressHover === address.id && !!address.value;
      },
      showPhoneRemove: function(phone) {
        return this.currentPhoneHover === phone.id && !!phone.value;
      },
      showEmailRemove: function(email) {
        return this.currentEmailHover === email.id && !!email.value;
      }
    },

    beforeUpdate() {
      this.contact = this.contactToEdit
    },

    updated() {
      let instance = this;
      let cookie = this.$cookie;
      let phones = this.contact.phones;
      let country_code = cookie.get('countryCode') || "";
      $("div[id^='country_']").each(function() {
        const phone_id = $(this).attr('id').split('_')[1];
        const country_select = $(this);
        country_select.intlTelInput({
          preferredCountries: [country_code],
          utilsScript: "../../public/js/utils.js",
          initialCountry: "auto",
          geoIpLookup: function(callback) {
            if (country_code !== null && country_code !== "") {
              callback(country_code);
              instance.$nextTick(function() {
                country_select.intlTelInput("setCountry", country_code);
              });
            } else {
              $.get("https://ipinfo.io", function() {}, "jsonp")
                .always(function(resp) {
                  country_code = (resp && resp.country) ? resp.country : "";
                  cookie.set('countryCode', country_code, {expires: 1});
                  callback(country_code);
                  instance.$nextTick(function() {
                    country_select.intlTelInput("setCountry", country_code);
                  });
                })
            }
          }
        });

        country_select.on("close:countrydropdown", function() {
          let dial_code = country_select.intlTelInput('getSelectedCountryData').dialCode;
          let phone = phones.find(function(phone) {
            return phone.id === parseInt(phone_id);
          });
          if (!!phone.value && phone.value.indexOf(" ") !== -1) {
            phone.value = `+${dial_code}${phone.value.slice(phone.value.indexOf(" "))}`;
          } else {
            phone.value = `+${dial_code} `;
          }
          $(`#country_${phone_id}_text`).focus();
        })
      });

    },
  }
</script>

<style scoped>

  .add-contact-row {
    max-height: 50px;
  }

  @media (max-width: 468px) {
    .action-button {
      margin-left: 0;
    }
  }

</style>