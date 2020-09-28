import { getTopTenTable, populateTable } from './helperFunctions';

function handleSubmit(matchId) {
  document.getElementById('timeGame').addEventListener('submit', async (e) => {
    e.preventDefault();
    e.submitter.disabled = true;
    const name = document.getElementById('timeName').value;
    const addToTable = fbFunctions.httpsCallable('addToTimesTable');
    let topTenTable = await addToTable({ id: matchId, name });
    e.target.parentElement.style.display = 'none';
    populateTable(topTenTable.data);
    document.getElementById('topTenDiv').style.display = 'flex';
  });
}

export { handleSubmit };

// const string =
// 'seconds: ' +
// Math.floor(millis / 1000) +
// ' - miliseconds: ' +
// Math.floor(millis % 1000);
