function setTheme(mode) {
  document.body.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme', mode);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

document.getElementById('toggle').addEventListener('click', toggleTheme);
setTheme(localStorage.getItem('theme') || 'light');
