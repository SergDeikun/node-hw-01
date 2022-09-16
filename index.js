const { program } = require('commander');

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.getContactsList();
      console.table(contactsList);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: '2' });
// invokeAction({
//   action: 'add',
//   name: 'Bob',
//   email: 'bob@mail.com',
//   phone: '(992) 914-000',
// });
// invokeAction({ action: 'remove', id: 'PjPTgksmC2R-LnezD2tyL' });