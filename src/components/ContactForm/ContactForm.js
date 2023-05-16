import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    createContact(name, phone);
    reset();
  };

  const createContact = (name, phone) => {
    const newContact = {
      name: name,
      phone: phone,
    };
    const contactNames = [];
    contacts.map(contact => contactNames.push(contact.name));

    if (contactNames.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact(newContact));
  };

  const showMessage = e => {
    Notify.init({ timeout: 5000, clickToClose: true });
    return Notify.warning(e.target.title);
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form
      className={css.contactForm}
      onSubmit={handleSubmit}
      name={name}
      number={phone}
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
          name="phone"
          value={phone}
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
