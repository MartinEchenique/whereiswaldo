const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
exports.checkPersonage = functions.https.onCall(async (data, context) => {
  const matchRef = db.collection('matchs').doc(data.id);
  const matchDoc = await matchRef.get();
  if (matchDoc.data() === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'match not found');
  }
  const gameName = matchDoc.data().gameName;
  const docRef = db.collection(gameName).where('name', '==', data.name);
  const snap = await docRef.get();
  let doc = snap.docs[0];
  if (doc === undefined) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'personage not found',
    );
  }
  let coordinates = doc.data().coordinates;
  if (
    data.coordinates[0] >= coordinates.startX &&
    data.coordinates[0] <= coordinates.endX &&
    data.coordinates[1] >= coordinates.startY &&
    data.coordinates[1] <= coordinates.endY
  ) {
    const newPersonages = matchDoc.data().personages;
    newPersonages[data.name] = true;
    await matchRef.update({
      personages: newPersonages,
    });
    const win = await checkWin(data.id);
    if (win) {
      await matchRef.set(
        {
          end: admin.firestore.Timestamp.now(),
        },
        { merge: true },
      );
      let miliseconds = await getTime(data.id);
      let isTopTenTime = await isTopTen(miliseconds, gameName);
      return {
        data: true,
        miliseconds,
        isTopTenTime,
      };
    }
    return { data: true };
  }
  return { data: false };
});
exports.newMatch = functions.https.onCall(async (data, context) => {
  const gameInfoRef = db.collection(data.gameName);
  let gameInfo = await gameInfoRef.get();
  if (gameInfo.docs.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Game Not Found');
  }
  let personages = gameInfo.docs.reduce(
    (a, b) => ((a[b.data().name] = false), a),
    {},
  );
  let start = admin.firestore.Timestamp.now();
  const newMatch = await db
    .collection('matchs')
    .add({ personages, start, gameName: data.gameName });
  return newMatch.id;
});
exports.addToTimesTable = functions.https.onCall(async (data, context) => {
  const name = data.name;
  let time;
  if (!/^([a-zA-Z ]){4,10}$/.test(name)) {
    throw new functions.https.HttpsError('invalid-argument', 'invalid name');
  }
  try {
    time = await getTime(data.id);
  } catch (err) {
    throw new functions.https.HttpsError('invalid-argument', err.message);
  }
  let doc = await db.collection('matchs').doc(data.id).get();
  const gameName = doc.data().gameName;
  const topTen = await isTopTen(time, gameName);
  if (topTen) {
    await db.collection(`${gameName}Table`).doc(data.id).set({ name, time });
  }
  const topTenTable = await getTopTen(gameName);
  return topTenTable;
});
exports.getTopTenTable = functions.https.onCall(async (data, context) => {
  const topTen = await getTopTen(data.gameName);
  return topTen;
});
async function checkWin(id) {
  let gameEnds = true;
  let doc = await db.collection('matchs').doc(id).get();
  let personages = doc.data().personages;
  for (const key in personages) {
    if (personages.hasOwnProperty(key)) {
      if (personages[key] === false) {
        gameEnds = false;
        break;
      }
    }
  }
  return gameEnds;
}
async function getTime(id) {
  let doc = await db.collection('matchs').doc(id).get();
  if (doc.data() === undefined) {
    throw new functions.https.HttpsError('invalid-argument', 'Match not found');
  }
  if (doc.data().end === undefined) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      "Match didn't end yet",
    );
  }
  const start = doc.data().start.toMillis();
  const end = doc.data().end.toMillis();
  const millis = end - start;

  return millis;
}
async function isTopTen(time, gameName) {
  const topTen = await getTopTen(gameName);
  if (!topTen[9] || time < topTen[9].time) {
    return true;
  }
  return false;
}
async function getTopTen(gameName) {
  const topTenref = db.collection(`${gameName}Table`).orderBy('time').limit(10);
  const topTen = await topTenref.get();
  const list = topTen.docs.map((doc) => {
    return { time: doc.data().time, name: doc.data().name };
  });
  return list;
}
