// /api/profile.js
module.exports = (req, res) => {
    if (req.method === 'POST') {
      // Your webhook handling code here
      res.status(200).send('Webhook received');
    } else {
      // Handle any other HTTP method
      res.status(405).send('Method Not Allowed');
    }
  };
  
  // /api/profile.js (temporary debugging purpose)
module.exports = (req, res) => {
    if (req.method === 'GET') {
      res.status(200).send('GET request to the profile page');
    } else {
      // Handle any other HTTP method
      res.status(405).send('Method Not Allowed');
    }
  };
  