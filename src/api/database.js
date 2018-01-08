import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyB87EDUtC2-oH_bpwCaWIRijHQQvSC3Qqs',
  authDomain: 'kots-contacts.firebaseapp.com',
  databaseURL: 'https://kots-contacts.firebaseio.com',
  projectId: 'kots-contacts',
  storageBucket: 'kots-contacts.appspot.com',
  messagingSenderId: '920402365801'
}

export const firebaseApp = firebase.initializeApp(config)

export const contactsRef = firebaseApp.database().ref().child('contacts')

export const avatarsRef = firebaseApp.storage().ref()

export const saveContact = function (contact, callback) {
  let contactRef = firebase.database().ref('contacts/' + contact.id)
  contactRef.set(contact, function (error) {
    callback(error)
  })
}

export const fetchContact = function (contactId) {
  let contactRef = firebase.database().ref('contacts/' + contactId)
  return contactRef.once('value')
}

export const fetchContacts = function () {
  let contacts = []
  let contactsRef = firebaseApp.database().ref().child('contacts')
  contactsRef.orderByChild('fullName').on('value', snapshot => {
    snapshot.forEach(contact => {
      contacts.push(contact.val())
    })
    return contacts
  })
}

export const deleteContact = function (contactId, callback) {
  return firebase.database().ref('contacts/' + contactId).remove(function (error) {
    callback(error)
  })
}

export const deleteContacts = function (contactIds, callback) {
  let updates = {}
  for (const contactId of contactIds) {
    updates['contacts/' + contactId] = null
  }
  firebase.database().ref().update(updates, function (error) {
    callback(error)
  })
}
