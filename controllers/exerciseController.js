import exercises from '../data/exercises.js';
import generateId from '../utils/generateId.js';

/* GET all exercises */
const getAllExercises = (req, res) => {
  let results = [...exercises];

  const { category, difficulty, sort, page = 1, limit = 10 } = req.query;

/* Filter by category */
  if (category) {
    results = results.filter(ex => ex.category === category);
  }

/* Filter by difficulty */
  if (difficulty) {
    results = results.filter(ex => ex.difficulty === difficulty);
  }

/* Duration filters (gte, lte, eq) */
  if (req.query.duration) {
    const durationQuery = req.query.duration;

/*     if (durationQuery.gte) {
      results = results.filter(ex => ex.duration >= Number(durationQuery.gte));
    } */

    if (durationQuery.lte) {
      results = results.filter(ex => ex.duration <= Number(durationQuery.lte));
    }

/*     if (durationQuery.eq) {
      results = results.filter(ex => ex.duration === Number(durationQuery.eq));
    }
 */  }

/* Sorting */
  if (sort) {
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const direction = sort.startsWith('-') ? -1 : 1;

    results = results.sort((a, b) => {
      if (a[sortField] > b[sortField]) return direction;
      if (a[sortField] < b[sortField]) return -direction;
      return 0;
    });
  }

/* Pagination */
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = results.slice(start, end);

  res.json({
    total: results.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
};

/* GET a single exercise by ID */
const getExerciseById = (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = exercises.find(ex => ex.id === id);

  if (!exercise) {
    return res.status(404).json({ message: `Exercise with id ${id} not found.` });
  }

  res.status(200).json(exercise);
};

/* POST (create) exercises */
const createExercise = (req, res) => {
  const { name, category, difficulty, duration } = req.body;

  if (!name || !category || !difficulty || !duration) {
    return res.status(400).json({ message: 'All fields are required: name, category, difficulty, duration.' });
  }

  const newExercise = {
    id: generateId(exercises),
    name,
    category,
    difficulty,
    duration
  };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
};

/* PUT (update/replace whole) exercises */
const updateExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, difficulty, duration } = req.body;

  const index = exercises.findIndex(ex => ex.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Exercise with id ${id} not found.` });
  }

  if (!name || !category || !difficulty || !duration) {
    return res.status(400).json({ message: 'All fields are required: name, category, difficulty, duration.' });
  }

  exercises[index] = { id, name, category, difficulty, duration };
  res.status(200).json(exercises[index]);
};

/* PATCH (partially update) exercises */
const patchExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = exercises.find(ex => ex.id === id);

  if (!exercise) {
    return res.status(404).json({ message: `Exercise with id ${id} not found.` });
  }

  /* Only update fields that are provided */
  const { name, category, difficulty, duration } = req.body;
  if (name !== undefined) exercise.name = name;
  if (category !== undefined) exercise.category = category;
  if (difficulty !== undefined) exercise.difficulty = difficulty;
  if (duration !== undefined) exercise.duration = duration;

  res.status(200).json(exercise);
};

/* DELETE exercises */
const deleteExercise = (req, res) => {
  const id = parseInt(req.params.id);
  const index = exercises.findIndex(ex => ex.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Exercise with id ${id} not found.` });
  }

  const deleted = exercises.splice(index, 1);
  res.status(200).json({ message: 'Exercise deleted successfully.', deleted: deleted[0] });
};

export {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
};