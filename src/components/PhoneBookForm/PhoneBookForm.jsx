import { addContact } from '../../redux/contacts/contacts-slise';
import { useState } from 'react';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { useSelector, useDispatch } from 'react-redux';

import initialStateForm from '../initialStateForm';

import styles from '../App.module.css';

const PhoneBookForm = () => {
  const [state, setState] = useState({ ...initialStateForm });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);

  const isDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contact = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contact);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name } = state;
    handleAddContact({ name, number });
    if (!isDuplicate(name)) {
      setState({ ...initialStateForm });
    }
  };

  const { name, number } = state;
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="">Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="">Number</label>
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button type="submit">Add contact</button>
    </form>
  );
};

export default PhoneBookForm;
