const studentData = require('./data.js');

const searchChildren = (req, res) => {
  const { first_name, last_name } = req.body;

  if (!first_name && !last_name) {
    return res.status(400).json({
      error: 'Please enter first name or last name of the child',
    });
  }

  let results = studentData.filter((child) => {
    const firstNameMatch = first_name
      ? partialMatch(child.first_name.toLowerCase(), first_name.toLowerCase())
      : true;
    const lastNameMatch = last_name
      ? partialMatch(child.last_name.toLowerCase(), last_name.toLowerCase())
      : true;
    return firstNameMatch && lastNameMatch;
  });

  if (results.length === 0) {
    return res
      .status(404)
      .json({ message: 'No children found with provided criteria' });
  }

  res.json(results);
};

// Function to search for partial strings
const partialMatch = (str, pattern) => {
  const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedPattern.replace(/\*/g, '.*'), 'i');
  return regex.test(str);
};

module.exports = { searchChildren };
