
const path = require("path");
const Contact = require('./Contact')

const contactsPath = './models/contacts.json';


const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete({ _id: contactId });
    return result;
  } catch (error) {
    return null;
  }
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { name: body.name, email: body.email, phone: body.phone }
    );
    return result;
  } catch (error) {
    return null;
  }
};

const updateStatusContact = async (contactId, favorite) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: favorite }
    );
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};