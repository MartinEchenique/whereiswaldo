function handleSubmit(matchId) {
  document.getElementById('timeGame').addEventListener('submit', async (e) => {
    e.preventDefault();
    e.submitter.disabled = true;
    const name = document.getElementById('timeName').value;
    const addToTable = fbFunctions.httpsCallable('addToTimesTable');
    await addToTable({ id: matchId, name });
    e.target.parentElement.style.display = 'none';
  });
}

export { handleSubmit };
