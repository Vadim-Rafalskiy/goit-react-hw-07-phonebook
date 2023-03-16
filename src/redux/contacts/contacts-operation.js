import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'shared/servises/contacts-api';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fatch-all',
  async (_, thunkApi) => {
    try {
      const data = await api.getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkApi.rejectWithValue(response.data.message);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/add', //first argument
  //   async (data, thunkApi) => {
  async (data, { rejectWithValue }) => {
    //second argument
    try {
      const result = await api.addContact(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  },
  {
    // condition: (data, thunkApi) => {
    condition: ({ name }, { getState }) => {
      //thirв argument
      const { contacts } = getState();

      const normalizeName = name.toLowerCase();
      const result = contacts.items.find(({ name }) => {
        return name.toLowerCase() === normalizeName;
      });
      if (result) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

// const isDuplicate = (contacts, { name }) => {
//   const normalizeName = name.toLowerCase();
//   const contact = contacts.find(({ name }) => {
//     return name.toLowerCase() === normalizeName;
//   });
//   return Boolean(contact);
// };

// export const fetchAddContact = data => {
//   const func = async (dispatch, getState) => {
//     try {
//       const { contacts } = getState();
//       if (isDuplicate(contacts.items, data)) {
//         alert(`${data.name} is already in contacts`);
//         return false;
//       }
//       dispatch(actions.fetchAddContactLoading());
//       const result = await api.addContact(data);

//       dispatch(actions.fetchAddContactSuccess(result));
//     } catch ({ response }) {
//       dispatch(actions.fetchAddContactError(response.data.message));
//     }
//   };
//   return func;
// };

export const fetchDeleteContact = createAsyncThunk(
  'contacts/delete',
  //   async (data, thunkApi) => {
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

// export const fetchDeleteContact = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.fetchDeleteContactLoading());
//       await api.deleteContact(id);
//       dispatch(actions.fetchDeleteContactSuccess(id));
//     } catch ({ response }) {
//       dispatch(actions.fetchDeleteContactError(response.data.message));
//     }
//   };
//   return func;
// };
