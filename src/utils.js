export function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export function mapCollectionDocs(querySnapshot) {
  if (
    Object.getPrototypeOf(querySnapshot).constructor.name !== 'QuerySnapshot'
  ) {
    console.error(
      'mapDocs works only with collection referenses' +
        'For example: db.collection(COLLETION).get().then(querySnapshot => mapDocs(querySnapshot))'
    );
    return [];
  }
  // Create map behavior
  const docs = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    docs.push({ id: doc.id, ...data });
  });
  return docs;
}

export function extractProp(model, propName) {
  const cache = model[propName];
  delete model[propName];
  return cache;
}
