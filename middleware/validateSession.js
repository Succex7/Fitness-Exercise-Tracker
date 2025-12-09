const validateSession = (req, res, next) => {
  const { exerciseId, reps, sets, notes } = req.body;

  /* Checks if all required fields exist */
  if (
    exerciseId === undefined ||
    reps === undefined ||
    sets === undefined ||
    notes === undefined
  ) {
    return res.status(400).json({
      message: "All fields are required: exerciseId, reps, sets, notes."
    });
  }

  /* Validate data types */
  if (typeof exerciseId !== "number" || exerciseId <= 0) {
    return res.status(400).json({ message: "exerciseId must reference to an existing exercise." });
  }

  if (typeof reps !== "number" || reps <= 0) {
    return res.status(400).json({ message: "reps must be number." });
  }

  if (typeof sets !== "number" || sets <= 0) {
    return res.status(400).json({ message: "sets must be a number." });
  }

  if (typeof notes !== "string" || notes.trim() === "") {
    return res.status(400).json({ message: "notes must be a non-empty string." });
  }

  next();
};

export default validateSession;