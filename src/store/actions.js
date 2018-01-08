import * as types from './mutation-types'

export const setContacts = ({commit}, contactsPayload) => {
  commit(types.SET_CONTACTS, contactsPayload)
}

export const setNewContact = ({commit}, newContact) => {
  commit(types.SET_NEW_CONTACT, newContact)
}

export const toggleViewContact = ({commit}) => {
  commit(types.TOGGLE_VIEW_CONTACT)
}

export const setViewTransition = ({commit}, viewTransition) => {
  commit(types.SET_VIEW_TRANSITION, viewTransition)
}

export const toggleAddContact = ({commit}) => {
  commit(types.TOGGLE_ADD_CONTACT)
}

export const toggleEditContact = ({commit}) => {
  commit(types.TOGGLE_EDIT_CONTACT)
}

export const toggleDeleteContact = ({commit}) => {
  commit(types.TOGGLE_DELETE_CONTACT)
}

export const setSlim = ({commit}, slimPayload) => {
  commit(types.SET_SLIM, slimPayload)
}

export const toggleDrawer = ({commit}) => {
  commit(types.TOGGLE_DRAWER)
}

export const toggleSearch = ({commit}) => {
  commit(types.TOGGLE_SEARCH)
}

export const setSelected = ({commit}, selectedPayload) => {
  commit(types.SET_SELECTED, selectedPayload)
}

export const setActiveId = ({commit}, activeId) => {
  commit(types.SET_ACTIVE_ID, activeId)
}

export const toggleStar = ({commit}, id) => {
  commit(types.TOGGLE_STAR, id)
}

export const setTooltips = ({commit}) => {
  commit(types.SET_TOOLTIPS)
}

export const setSnackbar = ({commit}, snackbar) => {
  commit(types.SET_SNACKBAR, snackbar)
}
