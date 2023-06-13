const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
try {
    const data = await fs.readFile(contactsPath);
  
  return JSON.parse(data);
} catch (error) {
  console.log(error);
}
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);

    if (!result) return console.log('No such ID');
    
    return result;    
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1) return console.log('No such ID');
    const [result] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result;    
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact    

  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, { name, email, phone }) => {
    try {
      const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) return console.log('No such ID');
    
      contacts[index] = { id: contactId, name, email, phone };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      console.log(contacts[index]);
    return contacts[index];    
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
