// Function to handle the form submission for adding a new post
const addPostHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the title and text from the form inputs
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  try {
    // Send a POST request to the /api/post endpoint with the new post data
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response status indicates success
    if (response.ok) {
      // Redirect the user to the dashboard upon successful post creation
      document.location.replace('/dashboard');
    } else {
      // Alert the user if the post creation failed
      alert('Failed to post!');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error('Error during post creation:', error);
  }
};

// Add an event listener to the "Post" button
// Call the addPostHandler function when the button is clicked
document.querySelector('.post-btn').addEventListener('click', addPostHandler);
