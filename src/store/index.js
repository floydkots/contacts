import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from "./mutations"
import * as actions from "./actions"


Vue.use(Vuex);

const state = {
  contacts: [],
  view_contact: false,
  add_contact: false,
  edit_contact: false,
  active_id: null,
  drawer: null,
  search: false,
  tooltips: true,
  view_transition: "dialog-transition",
  selected: [],
  more_items: [
    {icon: 'archive', title: 'Hide from contacts'},
    {icon: 'delete', title: 'Delete'}
  ],
  icons: {
    "emails": "mail",
    "addresses": "location_on",
    "phones": "phone",
    "Hide from contacts": "archive",
    "Delete": "delete"
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    getContacts: (state) => {
      return state.contacts.filter(contact => !contact.hidden);
    },
    getSelected: (state) => {
      return state.selected;
    },
    getNumSelected: (state) => {
      return state.selected.length;
    },
    allSelected: (state) => {
      return state.selected.length === state.contacts.length;
    },
    getActiveId: (state) => {
      return state.active_id;
    },
    getActiveContact: (state) => {
      const contact = state.contacts.find((contact) => {
        return contact.id === state.active_id;
      });
      return contact;
    },
    getMoreItems: (state) => {
      return state.more_items;
    },
    disableTooltip: () => {
      return Modernizr.touchevents;
    }
  },
})