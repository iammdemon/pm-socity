import express from 'express';
import { EventController } from './controller.events';




const router = express.Router();

router.post('/', EventController.createAEvent)
router.get('/', EventController.getAllEvents)
router.get('/:slug', EventController.getSingleEvent)
router.put('/:slug', EventController.updateEvent)
router.delete('/:slug', EventController.deleteEvent)
export const EventRoutes = router