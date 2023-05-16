import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilterQuery } from 'redux/selectors';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filterQuery = useSelector(getFilterQuery);
  const dispatch = useDispatch();

  const removeContact = e => {
    const contactId = e.target.id;
    dispatch(deleteContact(contactId));
  };

  return contacts.length > 0 ? (
    <ul className={css.contactList}>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filterQuery.toLowerCase())
        )
        .map(({ id, name, phone }) => {
          return (
            <li className={css.contactItem} key={id}>
              {name}: {phone}
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
}
