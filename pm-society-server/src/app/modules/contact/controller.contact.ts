import catchAsync from "../../utils/catchAsync";
import { ContactService } from "./service.contact";

const createContact = catchAsync(async (req, res) => {
  const contactData = req.body;
  const result = await ContactService.createContactInfoIntoDB(contactData);
  res.status(201).json({
    status: "success",
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await ContactService.getAllContacts();
  res.status(200).json({
    status: "success",
    data: contacts,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
};
