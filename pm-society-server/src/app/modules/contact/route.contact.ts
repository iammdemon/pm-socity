import express from 'express';
import { ContactController } from './controller.contact';
const router = express.Router();

router.post('/', ContactController.createContact)
router.get('/', ContactController.getAllContacts);

export const ContactRoutes = router;