import { nanoid } from 'nanoid';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactItem from 'components/ContactItem/ContactItem';

import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';
import { fetchAllContacts } from 'redux/contacts/contacts-operation';

const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const elements = contacts.map(contact => (
    <ContactItem key={nanoid()} contact={contact} />
  ));

  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};
