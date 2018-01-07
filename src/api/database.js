import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB87EDUtC2-oH_bpwCaWIRijHQQvSC3Qqs",
  authDomain: "kots-contacts.firebaseapp.com",
  databaseURL: "https://kots-contacts.firebaseio.com",
  projectId: "kots-contacts",
  storageBucket: "kots-contacts.appspot.com",
  messagingSenderId: "920402365801"
};

export const firebaseApp = firebase.initializeApp(config);

export const contactsRef = firebaseApp.database().ref().child('contacts');

export const avatarsRef = firebaseApp.storage().ref();


export const saveContact = function(contact, callback) {
  let contactRef = firebase.database().ref('contacts/'+contact.id);
  contactRef.set(contact, function(error) {
    callback(error);
  })
};

export const fetchContact = function(contact_id) {
  let contactRef = firebase.database().ref('contacts/' + contact_id);
  return contactRef.once('value');
};

export const fetchContacts = function() {
  let contacts = [];
  let contactsRef = firebaseApp.database().ref().child('contacts');
  contactsRef.orderByChild('fullName').on('value', snapshot => {
    snapshot.forEach(contact => {
      contacts.push(contact.val())
    });
    return contacts;
  });
};

export const deleteContact = function(contact_id, callback) {
  return firebase.database().ref('contacts/' + contact_id).remove(function(error){
    callback(error);
  })
};

export const deleteContacts = function(contact_ids, callback) {
  let updates = {};
  for (const contact_id of contact_ids) {
    updates['contacts/' + contact_id] = null;
  }
  firebase.database().ref().update(updates, function(error) {
    callback(error);
  });
};