import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from "./mutations"
import * as actions from "./actions"


Vue.use(Vuex);

const state = {
  contacts: [],
  new_contact: {
    id: null,
    fullName: "",
    dateOfBirth: "",
    avatar: "",
    emails: [{id: 0, value:"", label:""}],
    phones: [{id: 0, value:"", label:""}],
    addresses: [{id: 0, value:"", label:""}],
    starred: false,
    hidden: false,
  },
  view_contact: false,
  add_contact: false,
  edit_contact: false,
  delete_contact: false,
  active_id: null,
  slim: {
    active: false,
    instance: null,
    contact: null,
  },
  drawer: null,
  search: false,
  tooltips: true,
  colors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
  view_transition: "dialog-transition",
  selected: [],
  more_items: [
    {icon: 'archive', title: 'Hide from contacts', name: 'Hide'},
    {icon: 'delete', title: 'Delete', name: 'Delete'}
  ],
  icons: {
    "emails": "mail",
    "addresses": "location_on",
    "phones": "phone",
    "Hide from contacts": "archive",
    "Delete": "delete"
  },
  snackbar: {
    active: false,
    message: "",
    color: "",
    timeout: 6000,
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
    getNewContact: (state) => {
      return state.new_contact;
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
      return state.contacts.find((contact) => {
        return contact.id === state.active_id;
      });
    },
    getMoreItems: (state) => {
      return state.more_items;
    },
    disableTooltip: () => {
      return Modernizr.touchevents;
    },
  },
})