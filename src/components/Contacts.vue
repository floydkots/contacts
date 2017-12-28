<template>
  <v-data-table
    v-model="selected"
    :items="$store.getters.getContacts"
    item-key="id"
    class="elevation-0 pl-0"
    hide-actions
    hide-headers
    ref="contacts_data_table"
    :style="{overflowX: 'hidden'}"
  >
    <template
      slot="items"
      slot-scope="props"
    >
      <tr
        v-on:mouseenter="hover = props.item.id"
        v-on:mouseleave="hover = null"
        @click="last_clicked = props.item.id"
        class="ma-2"
        :style="{
          borderRight: 0,
          borderBottom: 0,
          borderTop: 0,
          borderLeft: last_clicked === props.item.id ? '3px solid blue' : '3px solid transparent',
          cursor: 'pointer',
          background: props.selected ? '#E3E3E3' : '',
          }"
      >
        <td
          class="ma-0 pl-2 pr-0"
          @click="props.selected = !props.selected"
          :style="{ width: '50px', height: '60px' }"
        >
          <v-checkbox
            color="primary darken-4"
            hide-details

            :input-value="props.selected"
            v-if="hover === props.item.id || props.selected"
          ></v-checkbox>
          <v-avatar
            size="40px"
            v-else
          >
            <img
              :src="props.item.avatar"
              alt="avatar"
            >
          </v-avatar>
        </td>

        <td
          class="body-1 pl-3"
          @click="toggleView(props.item.id)"
        >
          {{ props.item.fullName }}
        </td>

        <td
          class="hidden-sm-and-down body-2"
          @click="toggleView(props.item.id)"
        >
          {{ props.item.emails[0].value }}
        </td>

        <td
          class="hidden-sm-and-down body-2"
          @click="toggleView(props.item.id)"
        >
          {{ props.item.phones[0].value }}
        </td>

        <td
          class="text-xs-right pa-0 ma-0"
          :style="{ width: '100px'}"
        >
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
              :style="{
opacity: hover === props.item.id ? 1 : 0}"
              @click="props.item.starred = !props.item.starred"
            >
              <v-icon
                v-if="!props.item.starred"
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
              :style="{
opacity: hover === props.item.id ? 1 : 0}"
              @click="toggleEdit(props.item.id)"
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
              :style="{
opacity: hover === props.item.id ? 1 : 0}"
            >
              <v-btn
                flat
                icon
                small
                color="grey darken-3"
                slot="activator"
                class="pa-0 ma-0"
                :style="{
opacity: hover === props.item.id ? 1 : 0}"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  avatar
                  v-for="item in $store.getters.getMoreItems"
                  :key="item.title"
                  @click="">
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
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "contacts",
    data() {
      return {
        last_clicked: null,
        icon: false,
        hover: null,
      }
    },

    methods: {
      toggleView: function(id) {
        this.$store.dispatch('setActiveId', id);
        this.$store.dispatch('toggleViewContact');
      },
      toggleEdit: function(id) {
        this.$store.dispatch('setActiveId', id);
        this.$store.dispatch('toggleEditContact');
      }
    },
    computed: {
      selected: {
        get: function() {
          return this.$store.getters.getSelected;
        },
        set: function(newSelected) {
          this.$store.dispatch('setSelected', newSelected)
        }
      }
    },
  }
</script>

<style scoped>

</style>