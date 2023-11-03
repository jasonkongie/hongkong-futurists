// api/handleTypeform.js
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Process the Typeform response and generate a profile object
      const profile = processProfile(req.body);
      // Here you would typically save the profile to your database
      // and possibly trigger a frontend update or static site rebuild
      // For now, we'll just log the profile
      console.log(profile);
      res.status(200).json({ message: 'Profile processed', profile });
    } catch (error) {
      console.error('Error processing profile:', error);
      res.status(500).json({ message: 'Error processing profile', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

function processProfile({ event_id, form_response }) {
  // Assuming the form_response structure includes the necessary details
  const { answers } = form_response;
  const profile = {};
  
  answers.forEach(answer => {
    const ref = answer.field.ref;
    const value = answer[answer.type];
    switch (ref) {
      // Add your case statements based on your form's ref ids
      case '95093871-d7df-4446-96f4-6445dc062e1c':
        profile.major = value.text;
        break;
      // ... (other case statements for different refs)
      default:
        break;
    }
  });

  return profile;
}
