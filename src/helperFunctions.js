async function handleGameOver(isTopTen) {
  if (isTopTen) {
    document.getElementById('timeFormFrame').style.display = 'flex';
  } else {
    let topTen = await getTopTenTable();
    populateTable(topTen);
    document.getElementById('topTenDiv').style.display = 'flex';
  }
}
async function getTopTenTable() {
  const getTopTenTable = fbFunctions.httpsCallable('getTopTenTable');
  const topTenTable = await getTopTenTable();
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

export { handleGameOver, getTopTenTable, populateTable };
