// Index file to manage the api routes

// Import just the router express
const router = require('express').Router();

// Import route modules
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// When a request is made to the /users path, it will be directed to the index.js in the /users folder.
router.use('/users', userRoutes);
// When a request is made to the /posts path, it will be directed to the index.js in the /posts folder.
router.use('/posts', postRoutes);
// When a request is made to the /comments path, it will be directed to the index.js in the /comments folder.
router.use('/comments', commentRoutes);

// Export the router so it can be used in other parts of the application
module.exports = router;
