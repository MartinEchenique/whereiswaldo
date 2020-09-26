import { GameImg } from './gameImg';
import { Pj } from './pj';
import { handleSubmit } from './submitTime';
window.onload = async () => {
  const startGame = fbFunctions.httpsCallable('newMatch');
  const gameData = await startGame({
    personages: ['wally', 'odlaw', 'wizard'],
  });
  const gameId = gameData.data;
  let wally = new Pj('wally', '../src/wally.png');
  let odlaw = new Pj('odlaw', '../src/odlaw.jpg');
  let wizard = new Pj('wizard', '../src/wizard.png');
  let game = new GameImg('../src/whereWaldo.jpg', gameId, {
    wally,
    odlaw,
    wizard,
  });
  handleSubmit(gameId);
};
