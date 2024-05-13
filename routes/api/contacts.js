const express = require("express");
const router = express.Router();
const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (contact) {
      return res.json(contact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.post("/", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const newContact = await contactsOperations.addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOperations.removeContact(
      req.params.contactId
    );
    if (contact) {
      res.json({ message: "contacto eliminado" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body.name && !req.body.email && !req.body.phone) {
      return res.status(400).json({ message: "missing fields" });
    }

    const validatedContact = req.body;

    const contact = await contactsOperations.updateContact(
      req.params.contactId,
      validatedContact
    );
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  if (req.body.favorite) {
    const result = await updateStatusContact(
      req.params.contactId,
      req.body.favorite
    );
    if (result != null) {
      res.status(200).send({ messege: "Update Conctact Completed" });
    } else {
      res.status(404).send({ message: "Id not found" });
    }
  } else {
    res.status(404).send({ message: "missing field favorite" });
  }
});

module.exports = router;