<template>
  <v-dialog
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
            <v-flex xs2 class="text-xs-center">
              <v-avatar size="50px">
                <img
                  src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                  alt="Grey silhouette"
                >
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
                v-model="fullName"
                :rules="fullNameRules"
                required
                :validateOnBlur="true"
              ></v-text-field>
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
                ></v-text-field>

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
            <v-spacer></v-spacer>
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
                      class="caption"
                      placeholder="Address"
                      v-model="address.value"
                    ></v-text-field>
                  </v-flex>
                </template>
                <template
                  v-else
                >
                  <v-flex xs5>
                    <v-text-field
                      class="caption"
                      placeholder="Address"
                      v-model="address.value"
                    ></v-text-field>
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
                    ></v-text-field>
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
                    ></v-text-field>
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
                    ></v-text-field>
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
                    ></v-text-field>
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
          <v-spacer></v-spacer>
          <v-btn
            flat
            large
            color="primary"
            @click="cancelAddContact"
          >Cancel</v-btn>
          <v-btn
            flat
            large
            @click="$store.dispatch('toggleAddContact')"
          >Save</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "add-contact",
    data: () => {
      return {
        menu: false,
        labels: ["Home", "Work", "Other"],
        newAddressId: 0,
        newPhoneId: 0,
        newEmailId: 0,
        fullNameHover: false,
        dateOfBirthHover: false,
        currentAddressHover: null,
        currentPhoneHover: null,
        currentEmailHover: null,
        fullName: "",
        dateOfBirth: null,
        addresses: [{id: 0, value:"", label:""}],
        phones: [{id: 0, value:"", label:""}],
        emails: [{id: 0, value:"", label:""}],
        fullNameRules: [
          (v) => !!v || 'Full Name is required',
          (v) => v && v.split(" ").length > 1 && v.split(" ")[1].length > 0 || 'Full Name must have at least 2 names'
        ],
        dateOfBirthRules: [
          // (v) => !!v || 'Date of Birth is required'
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

    methods: {
      addAddress: function() {
        this.addresses.push({
          id: ++this.newAddressId,
          value: "",
          label: ""
        });
      },
      addPhone: function() {
        this.phones.push({
          id: ++this.newPhoneId,
          value: "",
          label: ""
        })
      },
      addEmail: function() {
        this.emails.push({
          id: ++this.newEmailId,
          value: "",
          label: ""
        })
      },
      removeFullName: function() {
        this.fullName = "";
        this.$refs.fullName.reset();
      },
      removeDateOfBirth: function() {
        this.dateOfBirth = null;
        this.$refs.dateOfBirth.reset();
      },
      removeAddress: function(address) {
        if (this.addresses.length > 1) {
          this.addresses = this.addresses.filter(
            (currentAddress) => {
              return currentAddress.id !== address.id;
            })
        } else {
          address.value = "";
          address.label = "";
        }
      },
      removePhone: function(phone) {
        if (this.phones.length > 1) {
          this.phones = this.phones.filter(
            (currentPhone) => {
              return currentPhone.id !== phone.id;
            }
          )
        } else {
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
        if (this.emails.length > 1) {
          this.emails = this.emails.filter(
            (currentEmail) => {
              return currentEmail.id !== email.id;
            }
          )
        } else {
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
      clearAddContact: function() {
        this.removeFullName();
        this.removeDateOfBirth();
        for (let address of this.addresses) {
          this.removeAddress(address);
        }
        for (let phone of this.phones) {
          this.removePhone(phone);
        }
        for (let email of this.emails) {
          this.removeEmail(email);
        }
      },
      cancelAddContact: function() {
        this.clearAddContact();
        this.$store.dispatch('toggleAddContact')
      },
      showAddressAdd: function(address) {
        return address.id === this.addresses[this.addresses.length - 1].id && !!address.value;
      },
      showPhoneAdd: function(phone) {
        return phone.id === this.phones[this.phones.length - 1].id && !!phone.value;
      },
      showEmailAdd: function(email) {
        return email.id === this.emails[this.emails.length - 1].id && !!email.value;
      },
      showAddressIcon: function(id) {
        return id === this.addresses[0].id;
      },
      showPhoneIcon: function(id) {
        return id === this.phones[0].id;
      },
      showEmailIcon: function(id) {
        return id === this.emails[0].id;
      },
      showFullNameRemove: function() {
        return !!this.fullName && (Modernizr.touchevents ? true : this.fullNameHover);
      },
      showDateOfBirthRemove: function() {
        return !!this.dateOfBirth && (Modernizr.touchevents ? true : this.dateOfBirthHover);
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
    updated() {
      let instance = this;
      let cookie = this.$cookie;
      let phones = this.phones;
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
                    console.log("Setting country");
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

    }
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