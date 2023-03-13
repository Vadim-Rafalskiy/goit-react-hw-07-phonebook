import { useSelector } from 'react-redux';
import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';

import { nanoid } from 'nanoid';

import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);

  const elements = contacts.map(contact => (
    <ContactItem key={nanoid()} contact={contact} />
  ));

  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

// ContactList.propTypes = {
//   removeContact: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
// };
