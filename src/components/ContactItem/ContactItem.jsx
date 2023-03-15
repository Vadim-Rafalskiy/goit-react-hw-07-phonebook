import { useDispatch } from 'react-redux';

import { fetchDeleteContact } from 'redux/contacts/contacts-operation';

import PropTypes from 'prop-types';

import styles from '../App.module.css';

const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  return (
    <li className={styles.contactItem}>
      {name}: {number}
      <button
        className={styles.btnDelete}
        onClick={() => handleDeleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};
