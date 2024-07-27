// Function to handle editing a post
const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const postId = document.querySelector('#post-id').textContent.trim();

  try {
    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      // Include the updated title and content in the request body as a JSON string
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to save!');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    alert('Failed to save!');
  }
};

// Add event listeners to the save button
document.querySelector('.save-btn').addEventListener('click', editPostHandler);

// Function to handle deleting a post
const deletePostHandler = async (event) => {
  event.preventDefault();

  // Get the post ID from a hidden element and convert it to a number
  const id = document.querySelector('#post-id').textContent.trim();
  const postId = Number(id);
  console.log(postId); // Log the post ID for debugging

  try {
    // Send a DELETE request to remove the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete!');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete!');
  }
};

// Add event listeners to the delete button
document
  .querySelector('.delete-btn')
  .addEventListener('click', deletePostHandler);
