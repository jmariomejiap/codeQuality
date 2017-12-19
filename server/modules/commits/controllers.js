
const validateParams = (req, res, next) => {
  const token = req.token;
  const commitJson = req.commitJson;
  if (!token || !commitJson) {
    return res.status(404).json({ result: 'error', error: 'invalid_value' });
  }

  return next();
};

const parseJson = (req, res, next) => {
  const commitJson = req.commitJson;

  if (!commitJson.testCoveragePorcentage || !commitJson.author || !commitJson.gitCommitHash) {
    return res.status(404).json({ result: 'error', error: 'incomplete_json' });
  }

  return next();
};

const good = (req, res) => {
  return res.status(200).json({ result: 'ok', error: '' });
};

export { validateParams, parseJson, good };
