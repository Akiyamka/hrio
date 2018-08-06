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
      'mapCollectionDocs works only with collection referenses' +
        'For example: db.collection(COLLETION).get().then(querySnapshot => mapDocs(querySnapshot))'
    );
    return {};
  }

  /* querySnapshot is not array, support only forEach */
  return querySnapshot.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data();
    return acc;
  }, {});
}

export function extractProp(model, propName) {
  const cache = model[propName];
  delete model[propName];
  return cache;
}
