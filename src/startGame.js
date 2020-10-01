import { GameImg } from './gameImg';
import { Pj } from './pj';
import { handleSubmit } from './submitTime';
import { showError } from './helperFunctions';
async function startGame(gameName, numberOfPersonages) {
  const startGame = fbFunctions.httpsCallable('newMatch');
  let gameData;
  let personages = [];
  for (let i = 0; i < numberOfPersonages; i++) {
    personages.push(`character_${i}`);
  }
  try {
    gameData = await startGame({
      gameName,
    });
  } catch (err) {
    showError(err);
  }
  const gameId = gameData.data;
  const personagesObjects = personages.map((e, i) => {
    return new Pj(i, gameName);
  });

  new GameImg(gameName, gameId, personagesObjects);
  handleSubmit(gameId);
}
export { startGame };
