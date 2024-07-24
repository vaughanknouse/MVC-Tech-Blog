// Function to handle adding a new comment
const addCommentHandler = async (event) => {
  // Prevent the default action of the event, which is usually form submission
  event.preventDefault();

  // Find the closest parent element with the class "card" to ensure the comment is related to the correct post
  const cardElement = event.target.closest('.card');

  // Retrieve the value from the comment text input field and remove any leading or trailing spaces
  const content = cardElement.querySelector('.comment-text').value.trim();

  // Extract the post ID from a hidden element with the ID "post-id" within the same card
  const postId = cardElement.querySelector('#post-id').textContent.trim();
  // Convert the post ID to a number
  const post = Number(postId);

  try {
    // Make a POST request to the /api/comment endpoint with the comment data
    const response = await fetch('/api/comment', {
      method: 'POST',
      // Convert the comment data to a JSON string
      body: JSON.stringify({ content, post }),
      headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
    });

    // Check if the response was successful
    if (response.ok) {
      // Reload the page to display the newly added comment
      document.location.reload();
    } else {
      // If the response was not successful, throw an error
      throw new Error('Failed to comment');
    }
  } catch (error) {
    // Log the error to the console and show an alert if an error occurs
    console.error('Error adding comment:', error);
    alert('Failed to comment!'); // Notify the user of the failure
  }
};

// Add the addCommentHandler function as an event listener to each comment button
// Select all elements with the class "comment-btn" and attach the event handler
document.querySelectorAll('.comment-btn').forEach((button) => {
  button.addEventListener('click', addCommentHandler);
});
