const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const post_id = document.querySelector('input[name="post-id"]').value;
    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
  
    if (comment_text) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
  