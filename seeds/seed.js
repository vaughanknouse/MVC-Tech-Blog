// Master seed file to populate the database with some simple content when run

// Import necessary modules and models
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Import data from JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// Function to seed the database
const seedDatabase = async () => {
  // Sync the database and force drop/recreate tables
  await sequelize.sync({ force: true });

  // Bulk create users using the data from userData.json
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Ensure hooks (e.g., password hashing) are run for each user
    returning: true, // Return the created user instances
  });

  // Loop through each post in postData.json
  for (const post of postData) {
    // Create each post and assign a random user_id from the created users
    // This simulates different users creating posts
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Fetch all posts after creation
  const posts = await Post.findAll();

  // Loop through each comment in commentData.json
  for (const comment of commentData) {
    // Create each comment and assign random user_id and post_id from created users and posts
    // This simulates different users commenting on different posts
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  // Exit the process after seeding is complete
  process.exit(0);
};

// Call the seedDatabase function to seed the database
seedDatabase();
