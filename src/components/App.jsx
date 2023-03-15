import { useSelector } from 'react-redux';

import { getFilteredContacts } from '../redux/contacts/contacts-selectors';

import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';

import styles from './App.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1 className={styles.title}>Phonebook</h1>
        <PhoneBookForm />
      </div>

      <div className={styles.block}>
        <h2 className={styles.title}>Contacts</h2>
        <PhoneBookFilter />
        <ContactList />
        {!isContacts && <p>Contacts list is empty!</p>}
      </div>
    </div>
  );
};
