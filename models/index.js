// Index model file to handle the relational logic between the user, post, and comment models

// Import the models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define relationships between models

// A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id', // Foreign key in the Post model
  onDelete: 'CASCADE' // If a user is deleted, their posts are also deleted
});

// Each post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the Post model
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id', // Foreign key in the Comment model
  onDelete: 'CASCADE' // If a post is deleted, its comments are also deleted
});

// Each comment belongs to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the Comment model
}); 

// Each comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id' // Foreign key in the Comment model
});

// A user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id', // Foreign key in the Comment model
  onDelete: 'CASCADE' // If a user is deleted, their comments are also deleted
}); 

// Export the models for use in other parts of the application
module.exports = { User, Post, Comment };
