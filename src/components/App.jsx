import React, { useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      const isExistingContact = contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      );
      if (isExistingContact) {
        alert(`${newContact.name} is already in contacts.`);
      } else {
        setContacts(prevContacts => [...prevContacts, newContact]);
      }
      setName('');
      setNumber('');
    }
  };

  const handleDelete = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        height: '100vh',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onSubmit={handleSubmit}
        />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
