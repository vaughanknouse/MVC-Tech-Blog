// Index file to connect api folder and other routes

// Import just the router express
const router = require('express').Router();

// Import route modules
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// When a request is made to the /api route, it will be directed to the index.js in the 'api' folder.
router.use('/api', apiRoutes);
// Use the homeRoutes module for requests to the root URL ('/')
router.use('/', homeRoutes);

// Export the router so it can be used in other parts of the application
module.exports = router;
