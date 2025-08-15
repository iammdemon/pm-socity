import express from 'express';
import { ResourceController } from './controller.resources';





const router = express.Router();

router.post('/', ResourceController.createAResource)
router.get('/', ResourceController.getAllResources)

router.put('/:id',ResourceController.updateResource)
router.delete('/:id', ResourceController.deleteResource)
export const ResourceRoutes = router