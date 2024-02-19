const studentData = require('./data.js');

const searchChildren = (req, res) => {
  const firstName = req.query.first_name;
  const lastName = req.query.last_name;

  if (!firstName && !lastName) {
    return res.status(400).json({
      error: 'Please enter first name or last name of the child',
    });
  }

  let results = studentData.filter((child) => {
    const firstNameMatch = firstName
      ? partialMatch(child.first_name.toLowerCase(), firstName.toLowerCase())
      : true;
    const lastNameMatch = lastName
      ? partialMatch(child.last_name.toLowerCase(), lastName.toLowerCase())
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
