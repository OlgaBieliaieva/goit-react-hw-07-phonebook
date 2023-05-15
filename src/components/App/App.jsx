import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

export default function App() {
  return (
    <main className={css.appContainer}>
      <SectionTitle text="Phonebook" />
      <ContactForm />
      <SectionTitle text="Contacts" />
      <Filter />
      <ContactList />
    </main>
  );
}
