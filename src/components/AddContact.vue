<template>
  <div>
    <v-dialog
      ref="add_contact_dialog"
      v-model="$store.state.add_contact"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      width="700px"
      transition="dialog-bottom-transition"
      :hide-overlay="false"
    >
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
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
                    backgroundImage: avatar ? `url(${avatar.avatar})` : 'url(../../static/avatars/grey_silhouette.png)',
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
                  placeholder="First name    Last name"
                  v-model="fullName"
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
                    v-model="dateOfBirth"
                    class="caption"
                    placeholder="Date of Birth"
                    readonly
                    :rules="dateOfBirthRules"
                  />

                  <v-date-picker
                    v-model="dateOfBirth"
                    no-title
                    scrollable
                    actions
                  >
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          color="primary"
                          @click="cancel"
                        >Cancel</v-btn>

                        <v-btn
                          flat
                          color="success"
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
                v-for="address in addresses"
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
                v-for="phone in phones"
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
                v-for="email in emails"
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
            <v-btn
              flat
              large
              color="primary"
              @click="clearAddContact"
            >Clear</v-btn>
            <v-spacer/>
            <v-btn
              flat
              large
              color="primary"
              @click="closeAddContact"
            >Cancel</v-btn>
            <v-btn
              flat
              large
              color="success"
              @click="saveContact"
              :disabled="!validEntries()"
            >Save</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import $ from 'jquery'
  import { saveContact } from '../api/database'

  const Modernizr = require('../../src/assets/js/modernizr-custom')
  require('intl-tel-input')

  export default {
    name: 'add-contact',
    data: () => {
      return {
        menu: false,
        labels: ['Home', 'Work', 'Other'],
        avatar_hover: false,
        newAddressId: 0,
        newPhoneId: 0,
        newEmailId: 0,
        fullNameHover: false,
        dateOfBirthHover: false,
        currentAddressHover: null,
        currentPhoneHover: null,
        currentEmailHover: null,
        avatar: {avatar: '', thumbnail: '', filename: ''},
        fullName: '',
        dateOfBirth: null,
        addresses: [{id: 0, value: '', label: ''}],
        phones: [{id: 0, value: '', label: ''}],
        emails: [{id: 0, value: '', label: ''}],
        fullNameRules: [
          (v) => !!v || 'Full Name is required',
          (v) => (v && v.split(' ').length > 1 && v.split(' ')[1].length > 0) || 'Full Name must have at least 2 names'
        ],
        dateOfBirthRules: [
          (v) => !!v || 'Date of Birth is required'
        ],
        phoneRules: [
          (v) => !!v || 'Phone is required'
        ],
        emailRules: [
          (v) => !!v || 'Email is required',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },

    components: {
    },

    computed: {
      new_contact: function () {
        return this.$store.getters.getNewContact
      }
    },

    methods: {
      openSlim: function () {
        this.$store.dispatch('setSlim', {contact: this.$store.state.new_contact})
      },
      addAddress: function () {
        this.addresses.push({
          id: ++this.newAddressId,
          value: '',
          label: ''
        })
      },
      addPhone: function () {
        this.phones.push({
          id: ++this.newPhoneId,
          value: '',
          label: ''
        })
      },
      addEmail: function () {
        this.emails.push({
          id: ++this.newEmailId,
          value: '',
          label: ''
        })
      },
      removeAvatar: function () {
        let newContact = this.$store.state.new_contact
        newContact.avatar = null
        this.$store.dispatch('setNewContact', newContact)
      },
      removeFullName: function () {
        this.fullName = ''
        this.$refs.fullName.reset()
      },
      removeDateOfBirth: function () {
        this.dateOfBirth = null
        this.$refs.dateOfBirth.reset()
      },
      removeAddress: function (address) {
        if (this.addresses.length > 1) {
          this.addresses = this.addresses.filter(
            (currentAddress) => {
              return currentAddress.id !== address.id
            })
        } else {
          address.value = ''
          address.label = ''
        }
      },
      removeAddresses: function () {
        this.addresses = [{id: 0, value: '', label: ''}]
      },
      removePhone: function (phone) {
        if (this.phones.length > 1) {
          this.phones = this.phones.filter(
            (currentPhone) => {
              return currentPhone.id !== phone.id
            }
          )
        } else {
          phone.value = ''
          phone.label = ''
          let phoneRefs = this.$refs[`phone_${phone.id}`]
          if (phoneRefs && phoneRefs.length > 0) {
            for (let phoneRef of phoneRefs) {
              phoneRef.reset()
            }
          }
        }
      },
      removePhones: function () {
        this.phones = [{id: 0, value: '', label: ''}]
      },
      removeEmail: function (email) {
        if (this.emails.length > 1) {
          this.emails = this.emails.filter(
            (currentEmail) => {
              return currentEmail.id !== email.id
            }
          )
        } else {
          email.value = ''
          email.label = ''
          let emailRefs = this.$refs[`email_${email.id}`]
          if (emailRefs && emailRefs.length > 0) {
            for (let emailRef of emailRefs) {
              emailRef.reset()
            }
          }
        }
      },
      removeEmails: function () {
        this.emails = [{id: 0, value: '', label: ''}]
      },
      clearAddContact: function () {
        this.removeAvatar()
        this.removeFullName()
        this.removeDateOfBirth()
        this.removeAddresses()
        this.removePhones()
        this.removeEmails()
      },
      closeAddContact: function () {
        this.clearAddContact()
        this.$store.dispatch('toggleAddContact')
      },
      showAddressAdd: function (address) {
        return address.id === this.addresses[this.addresses.length - 1].id && !!address.value
      },
      showPhoneAdd: function (phone) {
        return phone.id === this.phones[this.phones.length - 1].id && !!phone.value
      },
      showEmailAdd: function (email) {
        return email.id === this.emails[this.emails.length - 1].id && !!email.value
      },
      showAddressIcon: function (id) {
        return id === this.addresses[0].id
      },
      showPhoneIcon: function (id) {
        return id === this.phones[0].id
      },
      showEmailIcon: function (id) {
        return id === this.emails[0].id
      },
      showFullNameRemove: function () {
        return !!this.fullName && (Modernizr.touchevents ? true : this.fullNameHover)
      },
      showDateOfBirthRemove: function () {
        return !!this.dateOfBirth && (Modernizr.touchevents ? true : this.dateOfBirthHover)
      },
      showAddressRemove: function (address) {
        return this.currentAddressHover === address.id && !!address.value
      },
      showPhoneRemove: function (phone) {
        return this.currentPhoneHover === phone.id && !!phone.value
      },
      showEmailRemove: function (email) {
        return this.currentEmailHover === email.id && !!email.value
      },
      getNewId: function () {
        if (this.$store.state.contacts.length > 0) {
          let contacts = this.$store.state.contacts
          let newId = Math.max(...contacts.map(contact => { return contact.id }))
          return newId + 1
        }
        return 0
      },
      validEntries: function () {
        let fullName = false
        if (this.$refs.fullName) {
          fullName = this.$refs.fullName.valid
        }

        let dateOfBirth = false
        if (this.$refs.dateOfBirth) {
          dateOfBirth = this.$refs.dateOfBirth.valid
        }

        const addresses = () => {
          for (const address of this.$refs.addresses) {
            if (!address.valid) {
              return false
            }
          }
          return true
        }
        let phones = () => {
          for (const phone of this.phones) {
            if (phone.id !== null && phone.id !== undefined) {
              if (!(this.$refs[`phone_${phone.id}`] && this.$refs[`phone_${phone.id}`][0].valid)) {
                return false
              }
            }
          }
          return !!this.phones[0].value
        }
        let emails = () => {
          for (const email of this.emails) {
            if (email.id !== null && email.id !== undefined) {
              if (!(this.$refs[`email_${email.id}`] && this.$refs[`email_${email.id}`][0].valid)) {
                return false
              }
            }
          }
          return !!this.emails[0].value
        }

        return (fullName && dateOfBirth && addresses() && phones() && emails())
      },
      saveContact: function () {
        let myThis = this
        if (this.validEntries()) {
          this.$store.dispatch('setSnackbar', {
            color: 'info',
            message: 'Saving contact...'
          })
          let contactToSave = {
            id: this.getNewId(),
            fullName: this.fullName,
            dateOfBirth: this.dateOfBirth,
            avatar: this.avatar,
            emails: this.emails,
            phones: this.phones,
            addresses: this.addresses,
            starred: false,
            hidden: false
          }
          const saveCallback = function (error) {
            let snackbar = {}
            if (error) {
              snackbar = {
                color: 'error',
                message: `${error}`
              }
            } else {
              snackbar = {
                color: 'success',
                message: 'Contact saved successfully!'
              }
            }
            myThis.$store.dispatch('setSnackbar', snackbar)
          }
          saveContact(contactToSave, saveCallback)
          this.closeAddContact()
        } else {
          this.$store.dispatch('setSnackbar', {
            color: 'error',
            message: 'There were errors. Correct and resubmit'
          })
        }
      }
    },
    beforeUpdate () {
      this.avatar = this.new_contact.avatar
    },

    mounted () {
      this.fullName = this.new_contact.fullName
      this.dateOfBirth = this.new_contact.dateOfBirth
      this.addresses = this.new_contact.addresses
      this.phones = this.new_contact.phones
      this.emails = this.new_contact.emails
    },

    updated () {
      let instance = this
      let cookie = this.$cookie
      let phones = this.phones
      let countryCode = cookie.get('countryCode') || ''
      $("div[id^='country_']").each(function () {
        const phoneId = $(this).attr('id').split('_')[1]
        const countrySelect = $(this)
        countrySelect.intlTelInput({
          preferredCountries: [countryCode],
          initialCountry: 'auto',
          geoIpLookup: function (callback) {
            if (countryCode !== null && countryCode !== '') {
              callback(countryCode)
              instance.$nextTick(function () {
                countrySelect.intlTelInput('setCountry', countryCode)
              })
            } else {
              $.get('https://ipinfo.io', function () {}, 'jsonp')
                .always(function (resp) {
                  countryCode = (resp && resp.country) ? resp.country : ''
                  cookie.set('countryCode', countryCode, {expires: 1})
                  callback(countryCode)
                  instance.$nextTick(function () {
                    countrySelect.intlTelInput('setCountry', countryCode)
                  })
                })
            }
          }
        })

        countrySelect.on('close:countrydropdown', function () {
          let dialCode = countrySelect.intlTelInput('getSelectedCountryData').dialCode
          let phone = phones.find(function (phone) {
            return phone.id === parseInt(phoneId)
          })
          if (!!phone.value && phone.value.indexOf(' ') !== -1) {
            phone.value = `+${dialCode}${phone.value.slice(phone.value.indexOf(' '))}`
          } else {
            phone.value = `+${dialCode} `
          }
          $(`#country_${phoneId}_text`).focus()
        })
      })
    }
  }
</script>

<style scoped>

  .add-contact-row {
    max-height: 50px
  }

  @media (max-width: 468px) {
    .action-button {
      margin-left: 0
    }
  }

</style>
