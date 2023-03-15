import * as api from 'shared/servises/contacts-api';

import * as actions from './contacts-actions';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchAllContactsLoading());
      const data = await api.getAllContacts();
      dispatch(actions.fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(actions.fetchAllContactsError(response.data.message));
    }
  };
  return func;
};

const isDuplicate = (contacts, { name }) => {
  const normalizeName = name.toLowerCase();
  const contact = contacts.find(({ name }) => {
    return name.toLowerCase() === normalizeName;
  });
  return Boolean(contact);
};

export const fetchAddContact = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDuplicate(contacts.items, data)) {
        alert(`${data.name} is already in contacts`);
        return false;
      }
      dispatch(actions.fetchAddContactLoading());
      const result = await api.addContact(data);
      dispatch(actions.fetchAddContactSuccess(result));
    } catch ({ response }) {
      dispatch(actions.fetchAddContactError(response.data.message));
    }
  };
  return func;
};

export const fetchDeleteContact = id => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchDeleteContactLoading());
      await api.deleteContact(id);
      dispatch(actions.fetchDeleteContactSuccess(id));
    } catch ({ response }) {
      dispatch(actions.fetchDeleteContactError(response.data.message));
    }
  };
  return func;
};
