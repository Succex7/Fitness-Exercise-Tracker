import express from 'express';
import {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
} from '../controllers/exerciseController.js';

import validateExercise from '../middleware/validateExercise.js';

const router = express.Router();

/* GET all exercises */
router.get('/', getAllExercises);

/* GET a single exercise by ID */
router.get('/:id', getExerciseById);

/* CREATE a new exercise */
router.post('/', validateExercise, createExercise);

/* UPDATE an exercise completely */
router.put('/:id', validateExercise, updateExercise);

/* PARTIALLY (PATCH) update an exercise */
router.patch('/:id', patchExercise);

/* DELETE an exercise */
router.delete('/:id', deleteExercise);

export default router;