// Function to handle the form submission for adding a new post
const addPostHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the title and text from the form inputs
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add new post!');
    }
  }
};

// Add an event listener to the "Post" button
// Call the addPostHandler function when the button is clicked
document.querySelector('.post-btn').addEventListener('click', addPostHandler);
