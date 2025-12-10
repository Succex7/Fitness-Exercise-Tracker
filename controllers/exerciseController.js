import exercises from '../data/exercises.js';
import generateId from '../utils/generateId.js';

/* GET all exercises */
const getAllExercises = (req, res) => {
  let results = [...exercises];

   // -------- FILTERING ----------
    const { category, difficulty, duration, sort } = req.query;

    if (category) {
      results = results.filter(ex => ex.category.toLowerCase() === category.toLowerCase());
    }

    if (difficulty) {
      results = results.filter(ex => ex.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (duration) {
      const value = Number(duration);
      if (!isNaN(value)) {
        results = results.filter(ex => ex.duration <= value); // using only lte as required
      }
    }

    // -------- SORTING ----------
    if (sort) {
      const field = sort.replace("-", "");
      const direction = sort.startsWith("-") ? -1 : 1;

      results.sort((a, b) => {
        if (a[field] < b[field]) return -1 * direction;
        if (a[field] > b[field]) return 1 * direction;
        return 0;
      });
    }

    // -------- OPTIONAL PAGINATION ----------
    const { limit, page } = req.query;

    // IF user didn't request pagination → return ALL items
    if (!limit && !page) {
      return res.json({
        total: results.length,
        data: results,
      });
    }

    // IF user requested pagination → apply it
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || results.length;

    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    const paginated = results.slice(start, end);

    res.json({
      total: results.length,
      page: pageNum,
      limit: limitNum,
      data: paginated,
    });

    try {

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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