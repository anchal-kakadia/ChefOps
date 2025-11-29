import { Router } from 'express';
import {
  getAllMenuItems,
  getMenuItem,
  getAvailableMenuItems,
  getSpecialMenuItems,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller';

const router = Router();

router.get('/menu', getAllMenuItems);
router.get('/menu/available', getAvailableMenuItems);
router.get('/menu/specials', getSpecialMenuItems);
router.get('/menu/:id', getMenuItem);
router.patch('/menu/:id', updateMenuItem);
router.post('/menu', createMenuItem);
router.delete('/menu/:id', deleteMenuItem);

export default router;
