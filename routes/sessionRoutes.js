import express from 'express';
import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  patchSession,
  deleteSession
} from '../controllers/sessionController.js';
import validateSession from '../middleware/validateSession.js';

const router = express.Router();

/* GET all sessions */
router.get('/', getAllSessions);

/* GET session by ID */
router.get('/:id', getSessionById);

/* CREATE session */
router.post('/', validateSession, createSession);

/* UPDATE a session completely */
router.put('/:id', validateSession, updateSession);

/* partially (PATCH) update a session */
router.patch('/:id', patchSession);

/* DELETE session */
router.delete('/:id', deleteSession);

export default router;