// Routes file to handle comments

const router = require('express').Router();
const { User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new comment
/*router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      date_created: req.body.date_created,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});*/

router.post('/', withAuth, async (req, res) => {
  try {
    const { content, post_id } = req.body;
    const user_id = req.session.user_id;
    const date_created = new Date(); // Set the current date and time

    // Create the comment
    const commentData = await Comment.create({
      content,
      post_id,
      user_id,
      date_created,
    });

    // Fetch the username for the user_id
    const user = await User.findByPk(user_id);

    // Send response with the username and comment data
    res.status(200).json({
      ...commentData.get(), // Spread comment data to include all fields
      username: user ? user.username : 'Anonymous', // Include username in response
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a comment based on its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Post Comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
