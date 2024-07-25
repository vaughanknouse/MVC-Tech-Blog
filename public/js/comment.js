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

  if (content && postId) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //document.location.replace(`/post/${postId}`);
      document.location.reload();
      alert('Comment added!');
    } else {
      alert('Failed to add comment');
    }
  }
};

// Add the addCommentHandler function as an event listener to each comment button
// Select all elements with the class "comment-btn" and attach the event handler
document.querySelectorAll('.comment-btn').forEach((button) => {
  button.addEventListener('click', addCommentHandler);
});
