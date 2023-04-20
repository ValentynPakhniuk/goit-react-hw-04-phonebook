import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Container } from './Container.styled';
import { Filter } from './Filter/Filter';
import { LOCALSTORAGE_PHONEBOOK_KEY } from './constants';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(LOCALSTORAGE_PHONEBOOK_KEY);
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(prevContacts => [...prevContacts, ...parsedContacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_PHONEBOOK_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isContactExists = contacts.some(
      contact => contact.name === newContact.name
    );
    if (isContactExists) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </Container>
  );
};
