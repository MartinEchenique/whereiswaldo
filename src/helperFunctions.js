async function handleGameOver(isTopTen, gameName) {
  if (isTopTen) {
    document.getElementById('timeFormFrame').style.display = 'flex';
  } else {
    let topTen = await getTopTenTable(gameName);
    populateTable(topTen);
    document.getElementById('topTenDiv').style.display = 'flex';
  }
}
async function getTopTenTable(gameNAme) {
  const getTopTenTable = fbFunctions.httpsCallable('getTopTenTable');
  const topTenTable = await getTopTenTable({ gameName });
  return topTenTable.data;
}

function populateTable(table) {
  const tableElement = document.getElementById('topTenTable');
  table.forEach((element) => {
    const li = document.createElement('li');
    li.textContent =
      'second: ' +
      Math.floor(element.time / 1000) +
      ',' +
      (element.time % 1000) +
      ' name: ' +
      element.name;
    tableElement.appendChild(li);
  });
}

function showError(err) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = err;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }, 3000);
}
export { handleGameOver, populateTable, showError };
