import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { add, getContacts } from 'redux/contactsSlice';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    createContact(name, number);
    reset();
  };

  const createContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const contactNames = [];
    contacts.map(contact => contactNames.push(contact.name));

    if (contactNames.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(add(newContact));
  };

  const showMessage = e => {
    Notify.init({ timeout: 5000, clickToClose: true });
    return Notify.warning(e.target.title);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form
      className={css.contactForm}
      onSubmit={handleSubmit}
      name={name}
      number={number}
    >
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          onFocus={showMessage}
          placeholder="type name here..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          onFocus={showMessage}
          placeholder="type number here..."
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}
