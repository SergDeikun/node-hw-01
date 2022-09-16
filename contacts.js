const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(`${__dirname}/db/contacts.json`);

async function getContactsList() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContactsList();
  const contact = contacts.find(item => item.id === contactId);
  return contact || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await getContactsList();
  const newContact = {
    id: 2,
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await getContactsList();
  const id = String(contactId);
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
};
