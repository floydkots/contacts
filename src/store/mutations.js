import * as types from './mutation-types'
const Modernizr = require('../../src/assets/js/modernizr-custom')

export const mutations = {
  [types.SET_CONTACTS] (state, contactsPayload) {
    state.contacts = contactsPayload
  },

  [types.SET_NEW_CONTACT] (state, newContact) {
    state.new_contact = newContact
  },

  [types.TOGGLE_VIEW_CONTACT] (state) {
    state.view_contact = !state.view_contact
  },

  [types.SET_VIEW_TRANSITION] (state, viewTransition) {
    state.view_transition = viewTransition
  },

  [types.TOGGLE_ADD_CONTACT] (state) {
    state.add_contact = !state.add_contact
  },

  [types.TOGGLE_EDIT_CONTACT] (state) {
    state.edit_contact = !state.edit_contact
  },

  [types.TOGGLE_DELETE_CONTACT] (state) {
    state.delete_contact = !state.delete_contact
  },

  [types.SET_SLIM] (state, slimPayload = {}) {
    let {active = true, instance = null, contact = null} = slimPayload
    state.slim.active = active
    if (instance) state.slim.instance = instance
    if (contact) state.slim.contact = contact
  },

  [types.TOGGLE_DRAWER] (state) {
    state.drawer = !state.drawer
  },

  [types.TOGGLE_SEARCH] (state) {
    state.search = !state.search
  },

  [types.SET_SELECTED] (state, selectedPayload) {
    state.selected = selectedPayload
  },

  [types.SET_ACTIVE_ID] (state, activeId) {
    state.active_id = activeId
  },

  [types.TOGGLE_STAR] (state, id) {
    let contact = state.contacts.find((contact) => {
      return contact.id === id
    })
    contact.starred = !contact.starred
  },

  [types.SET_TOOLTIPS] (state) {
    state.tooltips = Modernizr.touchevents
  },

  [types.SET_SNACKBAR] (state, snackbar) {
    let {color, message, active = true} = snackbar
    state.snackbar.color = color
    state.snackbar.message = message
    state.snackbar.active = active
  }
}
