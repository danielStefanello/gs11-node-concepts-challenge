const { isUuid } = require("uuidv4");

const validateProjectsId = (req, res, next) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: "Invalid repositorie Id." });
  }

  return next();
};

module.exports = validateProjectsId;
