// Function to handle editing a post
const editPostHandler = async (event) => {
  // Prevent the default action of the event (form submission)
  event.preventDefault();

  // Retrieve the values from the form inputs and trim any extra spaces
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  // Get the post ID from a hidden element and convert it to a number
  const id = document.querySelector('#post-id').textContent.trim();
  const postId = Number(id);
  console.log(postId); // Log the post ID for debugging

  try {
    // Send a PUT request to update the post
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      // Include the updated title and text in the request body as a JSON string
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // Show an alert if the request failed
      alert('Failed to save!');
    }
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error('Error updating post:', error);
    alert('Failed to save!');
  }
};

// Function to handle deleting a post
const deletePostHandler = async (event) => {
  // Prevent the default action of the event (form submission)
  event.preventDefault();

  // Get the post ID from a hidden element and convert it to a number
  const id = document.querySelector('#post-id').textContent.trim();
  const postId = Number(id);
  console.log(postId); // Log the post ID for debugging

  try {
    // Send a DELETE request to remove the post
    const response = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // Show an alert if the request failed
      alert('Failed to delete!');
    }
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error('Error deleting post:', error);
    alert('Failed to delete!');
  }
};

// Add event listeners to the save and delete buttons
document.querySelector('.save-btn').addEventListener('click', editPostHandler);
document
  .querySelector('.delete-btn')
  .addEventListener('click', deletePostHandler);
