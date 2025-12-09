import sessions from '../data/sessions.js';

 /* GET all sessions */
const getAllSessions = (req, res) => {
  res.status(200).json(sessions);
};

/* GET a single session by ID */
const getSessionById = (req, res) => {
  const id = parseInt(req.params.id);
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return res.status(404).json({ message: `Session with id ${id} not found.` });
  }

  res.status(200).json(session);
};

/* POST (create) sessions */
const createSession = (req, res) => {
  const { exerciseId, reps, sets, notes } = req.body;

  if (!exerciseId || reps === undefined || sets === undefined || notes === undefined) {
    return res.status(400).json({
      message: 'All fields are required: exerciseId, reps, sets, notes.'
    });
  }

  const newSession = {
    id: sessions.length > 0 ? sessions[sessions.length - 1].id + 1 : 1,
    exerciseId,
    reps,
    sets,
    notes
  };

  sessions.push(newSession);
  res.status(201).json(newSession);
};

/* PUT (update/replace whole) sessions */
const updateSession = (req, res) => {
  const id = parseInt(req.params.id);
  const index = sessions.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Session with id ${id} not found.` });
  }

  const { exerciseId, reps, sets, notes } = req.body;

  if (!exerciseId || reps === undefined || sets === undefined || notes === undefined) {
    return res.status(400).json({
      message: 'All fields are required: exerciseId, reps, sets, notes.'
    });
  }

  sessions[index] = { id, exerciseId, reps, sets, notes };
  res.status(200).json(sessions[index]);
};

/* PATCH (partially update) sessions */
const patchSession = (req, res) => {
  const id = parseInt(req.params.id);
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return res.status(404).json({ message: `Session with id ${id} not found.` });
  }

  const { exerciseId, reps, sets, notes } = req.body;

  if (exerciseId !== undefined) session.exerciseId = exerciseId;
  if (reps !== undefined) session.reps = reps;
  if (sets !== undefined) session.sets = sets;
  if (notes !== undefined) session.notes = notes;

  res.status(200).json(session);
};

/* DELETE sessions */
const deleteSession = (req, res) => {
  const id = parseInt(req.params.id);
  const index = sessions.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Session with id ${id} not found.` });
  }

  const deleted = sessions.splice(index, 1);
  res.status(200).json({ message: 'Session deleted successfully.', deleted: deleted[0] });
};

export {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  patchSession,
  deleteSession
};