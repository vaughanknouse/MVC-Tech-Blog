const addCommentHandler = async (event) => {
  event.preventDefault();

  const cardElement = event.target.closest('.card');
  const content = cardElement.querySelector('.comment-content').value.trim();
  const postId = cardElement.querySelector('#post-id').textContent.trim();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id: postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newComment = await response.json();

      // Find the comments section
      const commentList = cardElement.querySelector('.comment-list');

      // Find the new comment element
      const commentElement = document.createElement('div');
      commentElement.classList.add('card-sm', 'card-body');
      commentElement.innerHTML = `
      ${newComment.content}
      <span class="blockquote-footer">${newComment.username} on ${new Date(
        newComment.date_created
      ).toLocaleDateString()}</span>
    `;

      // Append the new comment element to the comment list
      commentList.appendChild(commentElement);

      // Clear the input field
      cardElement.querySelector('.comment-content').value = '';

      alert('Comment added!');
    } else {
      alert('Failed to add comment');
    }
  }
};

// Add the addCommentHandler function as an event listener to each comment button
document.querySelectorAll('.comment-btn').forEach((button) => {
  button.addEventListener('click', addCommentHandler);
});
