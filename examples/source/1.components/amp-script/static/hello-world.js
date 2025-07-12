document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('hello-url');
  if (!button) return; // Prevents crash in test environment

  button.addEventListener('click', () => {
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello World!';
    document.body.appendChild(h1);
  });
});
