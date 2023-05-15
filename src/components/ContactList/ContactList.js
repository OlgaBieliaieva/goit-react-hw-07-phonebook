import { useSelector, useDispatch } from 'react-redux';
import { remove, getContacts } from 'redux/contactsSlice';
import { getFilterQuery } from 'redux/filterSlice';

import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filterQuery = useSelector(getFilterQuery);
  const dispatch = useDispatch();

  const removeContact = e => {
    const contactId = e.target.id;
    const remainingContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    dispatch(remove(remainingContacts));
  };

  return contacts.length > 0 ? (
    <ul className={css.contactList}>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filterQuery.toLowerCase())
        )
        .map(({ id, name, number }) => {
          return (
            <li className={css.contactItem} key={id}>
              {name}: {number}
              <button
                className={css.listItemBtn}
                id={id}
                type="button"
                onClick={removeContact}
              >
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  ) : (
    <p className={css.contactListDefault}>
      Sorry, your phonebook is empty. <br></br>
      Add your first contact, please.
    </p>
  );
};

export default ContactList;
