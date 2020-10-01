import { showError } from './helperFunctions';
async function checkForFound(index, coordinates, id) {
  name = `character_${index}`;

  try {
    const checkPersonage = fbFunctions.httpsCallable('checkPersonage');
    let isFound = await checkPersonage({
      name,
      coordinates,
      id,
    });
    return isFound.data;
  } catch (err) {
    showError(err.message);
    return { data: false };
  }
}

export { checkForFound };
