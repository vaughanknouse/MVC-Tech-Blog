// Routes file to handle homepage logic

// Import the necessary modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all posts including their associated user (author)
    const postData = await Post.findAll({
      include: [
        { 
          model: User, 
          attributes: ['username'], 
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with the posts data and login status
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in, // Check if the user is logged in
    });
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); // If the user is already logged in, redirect to the homepage
    return;
  }
  res.render('login'); // Render the login template
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); // If the user is already logged in, redirect to the homepage
    return;
  }
  res.render('signup'); // Render the signup template
});

// Route to get posts for the logged-in user's dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch posts by the logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id, // Filter by the logged-in user's ID
      },
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the posts data and login status
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in, // Check if the user is logged in
    });
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

// Route to get a single post by ID
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the post by its ID, including the user who created it and any comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'], // Include the username of the post author
        },
        {
          model: Comment,
          include: [User], // Include the user who made each comment
        },
      ],
    });

    // Serialize the data
    const post = postData.get({ plain: true });

    // Render the post template with the post data and login status
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in, // Check if the user is logged in
    });
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

// Export the router for use in the main application
module.exports = router;
