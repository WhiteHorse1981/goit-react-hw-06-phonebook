// import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from '../components/App.module.css';
// import { useLocalStorage } from '../components/hooks/useLocalStorege';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact, addContact, removeContact } from 'redux/phonebookSlice';
import { selectorContacts, selectorFilter } from 'redux/selector';

export const App = () => {
  // const [contacts, setContacts] = useLocalStorage('contacts', []);
  // const [filter, setFilter] = useState('');
  const filter = useSelector(selectorFilter);
  const contacts = useSelector(selectorContacts);
  const dispatch = useDispatch();

  const handleSubmit = data => {
    const id = nanoid();
    // const contactsLists = [...contacts];

    // if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
    //   alert(`${name} is already in contacts.`);
    // } else {
    //   contactsLists.push({ name, id, number });
    // }
    if (contacts.findIndex(contact => data.name === contact.name) !== -1) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    // setContacts(contactsLists);
    dispatch(addContact({ ...data, id }));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  const handleChange = e => {
    // const filter = e.target.value;
    // setFilter(filter);
    dispatch(filterContact(e.target.value));
  };

  const handleDelete = elementDeleteId => {
    // setContacts(prevState =>
    //   prevState.filter(contact => contact.id !== elementDeleteId)
    // );
    dispatch(removeContact(elementDeleteId));
  };

  return (
    <div className={css.app_style}>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
};
