import { IContact } from "./interface.contact";
import { Contact } from "./model.contact";

const createContactInfoIntoDB = async(payload: IContact)=>{
    const result = await Contact.create(payload);
    return result;
}

const getAllContacts = async () => {
    return await Contact.find().sort({ createdAt: -1 });
  };


export const ContactService = {
    createContactInfoIntoDB,
    getAllContacts

}