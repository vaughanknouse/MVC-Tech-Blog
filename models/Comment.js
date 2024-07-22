// Comment model file for blog comments structure

// Import Sequelize Model and DataTypes
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');

// Create Comment model
class Comment extends Model {}

// Create fields/columns for Comment model and initialize the Comment model
Comment.init(
  {
    // Define model's columns
    id: {
      type: DataTypes.INTEGER, // Integer data type for the id
      allowNull: false, // This field cannot be null
      primaryKey: true, // This field is the primary key
      autoIncrement: true, // This field auto-increments
    },
    content: {
      type: DataTypes.TEXT, // Text data type for the content (longer text)
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE, // Date data type for the creation date
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default value is the current date and time
    },
    user_id: {
      type: DataTypes.INTEGER, // Integer data type for the user_id
      references: {
        model: 'user', // Reference to the 'user' model
        key: 'id', // Foreign key refers to the 'id' field of the 'user' model
      },
    },
    post_id: {
      type: DataTypes.INTEGER, // Integer data type for the post_id
      references: {
        model: 'post', // Reference to the 'post' model
        key: 'id', // Foreign key refers to the 'id' field of the 'post' model
      },
    },
  },
  {
    // Define model options
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use snake_case for column names
    modelName: 'comment', // Define the model name
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
