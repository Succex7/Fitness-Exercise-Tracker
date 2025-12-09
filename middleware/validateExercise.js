const validateExercise = (req, res, next) => {
  const { name, category, difficulty, duration } = req.body;

  /* Checks if all required fields exist */
  if (!name || !category || !difficulty || duration === undefined) {
    return res.status(400).json({
      message: 'All fields are required: name, category, difficulty, duration.'
    });
  }

  /* Check types of each field */
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required.' });
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ message: 'category must be: strength, cardio, flexibility.' });
  }

  if (typeof difficulty !== 'string' || !['easy', 'medium', 'hard'].includes(difficulty.toLowerCase())) {
    return res.status(400).json({
      message: 'Difficulty must be: easy, medium, hard.'
    });
  }

  if (typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ message: 'duration must be a number greater than 0.' });
  }

  next();
};

export default validateExercise;